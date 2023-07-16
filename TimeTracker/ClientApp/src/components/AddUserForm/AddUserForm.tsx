import { useAppDispatch } from "../../hooks";
import { useState } from 'react';
import { TextInput, CheckboxInput, SmallButton, StepsElement, RangeInput } from "../UI";
import { useForm, SubmitHandler } from 'react-hook-form';
import { userAdd } from "../../redux";
import "./AddUserForms.css";

type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
    vacationDays: number,
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
    onNextStep: (dispatched: string) => void,
}

export const AddUserForm = ({ onNextStep }: AddUserFormProps) => {
    const dispatch = useAppDispatch();
    const [checkedOptions, setCheckedOptions] = useState<number>(0);
    const [hoursPerMonthValue, setHoursPerMonthValue] = useState<number>(100);
    

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                email: '',
                firstName: '',
                lastName: '',
                hoursPerMonth: hoursPerMonthValue,
                permissions: checkedOptions,
                vacationDays: 30,
            }
        });
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.permissions = checkedOptions;
        data.hoursPerMonth = parseInt((hoursPerMonthValue).toString())
        onNextStep(dispatch(userAdd(data)).type);
        reset();
    }

    return (
        <div className="user-form__wrapper-inner">
            <form onSubmit={handleSubmit(onSubmit)}>
                <StepsElement title="Step 1/2" currentStep={1} />
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

                <RangeInput title="Select working hours %:" minRange={25} maxRange={100} step={5} value={hoursPerMonthValue} onChange={setHoursPerMonthValue}/>

                <CheckboxInput title="Select user permissions:" options={options}
                    register={register('permissions')}
                    selected={checkedOptions}
                    setSelected={setCheckedOptions}
                    values={Permissions}
                    isMultipleChoice={true}
                />
                <SmallButton type="submit" value="Add user"/>
            </form>
        </div>
    );
};