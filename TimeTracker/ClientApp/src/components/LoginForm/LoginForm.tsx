import {LargeButton} from '@components/UI/Buttons/LargeButton';
import {PasswordInput} from '@components/UI/Inputs/PasswordInput';
import {TextInput} from '@components/UI/Inputs/TextInput';
import {Loader} from '@components/UI/Loaders/Loader';
import {InputTooltip} from '@components/UI/Tooltips/InputTooltip';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {auth, login, loginSuccess, loginWithCode, sendTwoStepCode, verifyUserLogin} from "../../redux";
import {H1, H5} from "../Headings";
import "./LoginForm.css";
import googleImg from '../../assets/images/search.png'
import githubImg from '../../assets/images/github.png'
import {useEffect, useState} from "react";

export type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {loading, error,twoStepCodeStatus,userToken, user, verifiedUser, currentAuth} = useTypedSelector(state => state.auth);

    const [step, setStep] = useState<number>(1);

    const [code,setCode] = useState<string>("");

    const [showTwoStep, setShowTwoStep] = useState<boolean>(false);

    const [to,setTo] = useState<string>("");

    const [inputData, setInputData] = useState<Inputs>({
        email: "", password: ""
    });

    const stepMsg = ['Sign in', 'Enter code']

    const {
        register, handleSubmit,
        formState: {errors}, reset
    } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        if (verifiedUser === null) {
            return;
        }

        if (verifiedUser.isTwoStepAuthEnabled) {

            let to:string="";
            let authType = verifiedUser.authType===1?"sms":verifiedUser.authType==2?"whatsapp":"email";

            if (verifiedUser.authType===1||verifiedUser.authType===2){
                to = `+${verifiedUser.phoneNumber}`;
            }else{
                to = verifiedUser.email;
            }

            dispatch(sendTwoStepCode({
                to: to,
                authType: authType
            }));

            setShowTwoStep(true);
            setTo(to);
        } else {
            dispatch(login(inputData));
        }

    }, [verifiedUser]);



    useEffect(() => {
        if(userToken!==""){
            dispatch(loginSuccess(userToken));
            setStep(0);
        }
    }, [userToken]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(verifyUserLogin(data));
        setInputData(data);
    }

    function handleAuthClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const authType = e.currentTarget.id;
        localStorage.setItem("authType", authType);
        window.location.href = `/to-external-auth?authType=${authType}`;
    }

    function handleLoginWithCode(){
        if(twoStepCodeStatus==="pending"){
            dispatch(loginWithCode({
                to:to,
                email:verifiedUser?.email!,
                code:code
            }));
        }
    }

    const LoginFromFirstStep = () => {

        return (
            <>
                <div className="external-auth-wrapper" style={{width: "65%"}}>
                    <a id="google" onClick={(e) => handleAuthClick(e)} className="external-auth"
                       href="/to-external-auth?authType=google">
                        <span>Continue with Google</span>
                        <img style={{width: "25px", height: "25px"}} src={googleImg} alt=""/>
                    </a>
                    <a id="github" onClick={(e) => handleAuthClick(e)} className="external-auth"
                       href="/to-external-auth?authType=github">
                        <span>Continue with Github</span>
                        <img style={{width: "25px", height: "25px"}} src={githubImg} alt=""/>
                    </a>
                </div>

                <div className="or">
                    <span className="or-text">OR</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="login-inputs__wrapper">
                        <TextInput name="email" placeholder="Enter your work email"
                                   register={register("email", {required: "Email can't be empty!"})}
                                   errors={errors.email}/>

                        <div className="password-input__wrapper">
                            <PasswordInput name="password" placeholder="Password"
                                           register={register("password", {required: "Password can't be empty!"})}
                                           errors={errors.password}/>

                            <InputTooltip description="Forgot your password?" url="/passwordRecovery"
                                          urlTitle="Click here"/>
                        </div>
                    </div>

                    <div className="tooltip-wrapper__bold" style={{display: 'none'}}>
                        <InputTooltip description="Don't have an account?" url="/auth" urlTitle="Get started"/>
                    </div>
                    <div className='submit-wrapper'>
                        <LargeButton type="submit" value="Login"/>
                    </div>
                </form>
            </>
        );
    }

    return (
        <div className="login-form__wrapper">

            <H1 value={stepMsg[step]}/>
            <div className="login-form__messages-wrapper" style={{display: `${error ? "flex" : "none"}`}}>
                {loading ? <Loader/> : ""}
                <H5 value={error ? error : ""}/>
            </div>
            {showTwoStep ? step === 0 ? <LoginFromFirstStep/> :
                <form className="login-form" style={{gap: "10px", marginTop: "10px"}}>
                    <input value={code} onChange={(e)=>{
                        setCode(e.target.value);
                    }} type="text" placeholder="your code" className="text-input" autoComplete='off'/>
                    <LargeButton handleClick={handleLoginWithCode} type="button" value="Login"/>
                </form> : <LoginFromFirstStep/>}
        </div>
    );
}