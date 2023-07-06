import { useAppDispatch } from "../../hooks";
import { useState } from 'react';
import { RadioButton } from "../UI/RadioButtons"
import { TextInput, CheckboxInput, SmallButton } from "../UI";
import { useForm, SubmitHandler } from 'react-hook-form';

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


export const Steps = () => {
    const dispatch = useAppDispatch();
    const radioOptions: number[] = [50, 60, 70, 80, 90, 100]

    const [selectedOption, setSelectedOption] = useState<number>(radioOptions[0]);
    const [checkedOptions, setCheckedOptions] = useState<number>(0);
    const [step, setStep] = useState<number>(0);


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
        setStep(2);
        //dispatch(userAdd(data));

        reset();
    }
    switch (step) {
        case 0:
            return (
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        setSelected={setCheckedOptions} />
                    <SmallButton type="submit" value="Add user" />
                </form>
            )
        default:
            return (
                <form>
                    <table>
                        <tr>
                            <th>User</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>
                                <input type="checkbox" />
                            </td>
                        </tr>
                    </table>
                    <SmallButton type="submit" value="Add user" />
                </form>
            )
    }
}
