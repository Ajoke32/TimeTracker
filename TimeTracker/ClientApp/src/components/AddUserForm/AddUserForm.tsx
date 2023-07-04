import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput } from "../UI/Inputs";
import { useAppDispatch, useTypedSelector } from "../../hooks";

type Inputs = {
    email: string
    firstName: string
    lastName: string
}

export const AddUserForm = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                email: '',
                firstName: '',
                lastName: ''
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        //dispatch(login(data));
        reset();
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput name="firstName" placeholder="First name" register={register("firstName", { required: "First name can't be empty!" })} errors={errors.firstName} />

                <TextInput name="lastName" placeholder="Last name" register={register("lastName", { required: "Last name can't be empty!" })} errors={errors.lastName} />

                <TextInput name="email" placeholder="Enter email" register={register("email", { required: "Email can't be empty!" })} errors={errors.email} />
            </form>
        </div>
    );
}