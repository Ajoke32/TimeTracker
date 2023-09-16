import { LargeButton } from '@components/UI/Buttons/LargeButton';
import { PasswordInput } from '@components/UI/Inputs/PasswordInput';
import { TextInput } from '@components/UI/Inputs/TextInput';
import { Loader } from '@components/UI/Loaders/Loader';
import { InputTooltip } from '@components/UI/Tooltips/InputTooltip';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import {googleAuth, login} from "../../redux";
import { H1, H5 } from "../Headings";
import "./LoginForm.css";


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
    const clientId = "719631149139-2puo0bcbfep0lmo7cspt1r050b4n94o8.apps.googleusercontent.com";
    const redirectUrl = "http://localhost:5166/google-auth";
    function googleLoginHandle(){
        window.location.href=window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&response_type=code&redirect_uri=${redirectUrl}&client_id=${clientId}`;
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

                        <InputTooltip description="Forgot your password?" url="/passwordRecovery" urlTitle="Click here" />
                    </div>
                </div>

                <div className="tooltip-wrapper__bold" style={{ display: 'none' }}>
                    <InputTooltip description="Don't have an account?" url="/auth" urlTitle="Get started" />
                </div>

                <div className='submit-wrapper'>
                    <LargeButton type="submit" value="Login" />
                </div>
                <div className='submit-wrapper'>
                   <button type="button" onClick={googleLoginHandle}>Google login</button>
                </div>
            </form>

        </div>
    );
}