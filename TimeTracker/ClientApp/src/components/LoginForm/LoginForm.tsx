import { LargeButton } from '@components/UI/Buttons/LargeButton';
import { PasswordInput } from '@components/UI/Inputs/PasswordInput';
import { TextInput } from '@components/UI/Inputs/TextInput';
import { Loader } from '@components/UI/Loaders/Loader';
import { InputTooltip } from '@components/UI/Tooltips/InputTooltip';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import {auth, login} from "../../redux";
import { H1, H5 } from "../Headings";
import "./LoginForm.css";
import googleImg from '../../assets/images/search.png'
import githubImg from '../../assets/images/github.png'
import {useEffect} from "react";

type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error,currentAuth } = useTypedSelector(state => state.auth);
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

    function handleAuthClick(e:React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        const authType = e.currentTarget.id;
        localStorage.setItem("authType",authType);
        window.location.href = `/to-external-auth?authType=${authType}`;
    }
    return (
        <div className="login-form__wrapper">

            <H1 value="Sign in" />
            <div className="login-form__messages-wrapper" style={{display:`${error?"flex":"none"}`}}>
                {loading ? <Loader /> : ""}
                <H5 value={error ? error : ""} />
            </div>

            <div className="external-auth-wrapper" style={{width:"65%"}}>
                <a id="google" onClick={(e)=>handleAuthClick(e)} className="external-auth" href="/to-external-auth?authType=google">
                    <span>Continue with Google</span>
                    <img style={{width:"25px",height:"25px"}} src={googleImg} alt=""/>
                </a>
                <a id="github" onClick={(e)=>handleAuthClick(e)} className="external-auth" href="/to-external-auth?authType=github">
                    <span>Continue with Github</span>
                    <img style={{width:"25px",height:"25px"}} src={githubImg} alt=""/>
                </a>
            </div>

            <div className="or">
                <span className="or-text">OR</span>
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
            </form>


        </div>
    );
}