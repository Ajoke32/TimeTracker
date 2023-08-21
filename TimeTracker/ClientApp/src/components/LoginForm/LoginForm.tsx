import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput, PasswordInput } from "../UI";
import { LargeButton } from "../UI";
import { InputTooltip } from "../UI";
import { Loader } from "../UI";
import { H1, H5 } from "../Headings"
import "./LoginForm.css"
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { login } from "../../redux";


type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useTypedSelector(state => state.auth);
    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                email: '',
                password: ''
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(login(data));
        reset();
    }

    return (
        <div className="login-form__wrapper">

            <H1 value="Sign in" />
            <div className="login-form__messages-wrapper">
                {loading ? <Loader /> : ""}
                <H5 value={error ? error : ""} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <div className="login-inputs__wrapper">
                    <TextInput name="email" placeholder="Enter your work email" register={register("email", { required: "Email can't be empty!" })} errors={errors.email} />

                    <div className="password-input__wrapper">
                        <PasswordInput name="password" placeholder="Password" register={register("password", { required: "Password can't be empty!" })} errors={errors.password} />

                        <InputTooltip description="Forgot your password?" url="/" urlTitle="Click here" />
                    </div>
                </div>

                <div className="tooltip-wrapper__bold" style={{ display: 'none' }}>
                    <InputTooltip description="Don't have an account?" url="/auth" urlTitle="Get started" />
                </div>

                <div className='submit-wrapper'>
                    <LargeButton type="submit" value="Login" />
                </div>
            </form>

        </div>
    );
}