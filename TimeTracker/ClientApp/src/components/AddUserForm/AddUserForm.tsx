import { useAppDispatch } from "../../hooks";
import { useState } from 'react';
import { RadioButton } from "../UI/RadioButtons"
import { TextInput, CheckboxInput, SmallButton } from "../UI";
import { useForm, SubmitHandler } from 'react-hook-form';
import StepsElement from "../UI/Misc/StepsElement";
import "./AddUserForms.css";

type Inputs = {
    email: string
    firstName: string
    lastName: string,
    workingHours: number,
    permissions: number
}


enum Permissions {
    Create = 1,
    Update = 2,
    Delete = 4,
    Read = 8,
}

const options: Permissions[] = [
    Permissions.Create,
    Permissions.Update,
    Permissions.Delete,
    Permissions.Read,
];
    
interface AddUserFormProps {
    onNextStep: () => void,
}
    
export const AddUserForm = ({onNextStep} : AddUserFormProps) => {
    const dispatch = useAppDispatch();
    const radioOptions: number[] = [50, 60, 70, 80, 90, 100]
    const [checkedOptions, setCheckedOptions] = useState<number>(0);


    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            workingHours: radioOptions[0],
            permissions: checkedOptions
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.permissions = checkedOptions;
        console.log(data)
        onNextStep();
        //dispatch(userAdd(data));

        reset();
    }

    return (
            <div className="user-form__wrapper-inner">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StepsElement title="Step 1/2" currentStep={1}/>
                    <span className="user-form__title">User registration:</span>
                    <TextInput name="firstName" placeholder="First name"
                               register={register("firstName", { required: "First name can't be empty!" })}
                               errors={errors.firstName} />

                    <TextInput name="lastName" placeholder="Last name"
                               register={register("lastName", { required: "Last name can't be empty!" })}
                               errors={errors.lastName} />

                    <TextInput name="email" placeholder="Enter email"
                               register={register("email", { required: "Email name can't be empty!" })}
                               errors={errors.email} />

                    <RadioButton title="Select working hours percentage:" options={radioOptions}
                                 name="workingHours"
                                 register={register("workingHours")} />

                    <CheckboxInput title="Select user permissions:" options={options}
                                   register={register('permissions')}
                                   selected={checkedOptions}
                                   setSelected={setCheckedOptions}
                                   values={Permissions}/>
                    <SmallButton type="submit" value="Add user"/>
                </form>
            </div>
    );
};