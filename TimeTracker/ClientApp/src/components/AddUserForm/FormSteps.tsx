import { useAppDispatch } from "../../hooks";
import { useState, useEffect } from 'react';
import { RadioButton } from "../UI/RadioButtons"
import { TextInput, CheckboxInput, SmallButton } from "../UI";
import { useForm, SubmitHandler } from 'react-hook-form';
import { userAdd } from "../../redux";
import { useTypedSelector } from "../../hooks";

type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
    workType: number,
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

export const Steps = () => {
    const dispatch = useAppDispatch();
    const radioOptions: number[] = [50, 60, 70, 80, 90, 100]

    const [step, setStep] = useState<number>(0);
    const [checkedOptions, setCheckedOptions] = useState<number>(0);
    const [dispatched, setDispatched] = useState<string>()

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                email: '',
                firstName: '',
                lastName: '',
                hoursPerMonth: radioOptions[0],
                permissions: checkedOptions,
                workType: 0,
                vacationDays: 30,
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.permissions = checkedOptions;
        data.workType = data.hoursPerMonth == 100 ? 0 : 1;

        setDispatched(dispatch(userAdd(data)).type);
        reset();
    }

    const { loading, error } = useTypedSelector(state => state.user);

    useEffect(() => {
        if (loading) {
            // Show loader
        }
        else if (dispatched === 'user/userAdd') {
            if (error === '')
                setStep(1);
            else {
                // Show error
            }
        }
    }, [loading]);

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
                        register={register("hoursPerMonth")} />

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
                    {/* <table>
                       
                    </table> */}
                    <SmallButton type="submit" value="Add user" />
                </form>
            )
    }
}
