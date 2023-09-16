import React, {useEffect, useState} from 'react';
import './PasswordRecovery.css'
import StepForm from "@components/PasswordRecoveryForms/StepForm.tsx";
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {codeVerify, createPassword, resetPassword} from "@redux/slices";

const formPlaceHolders = ['enter you email','enter code','come up with a new password']

const stepMessages = [formPlaceHolders[0],'The code was sent to the email','Create new a new password']

const loadingMessages = ['sending code to you email...','password checking...','password creation...']

const PasswordRecovery = () => {

    const dispatch = useAppDispatch();


    const {isEmailConfirmationDelivered,loading,userId,isCodeMatch,message,error} = useTypedSelector(s=>s.auth);

    const [value,setFormValue] = useState<string>("");

    const [step,setStep] = useState<number>(0);

    const dispatchFunctions = [handlePasswordRecovery,handleCodeVerify,handlePasswordCreate];


    useEffect(() => {
        if(isEmailConfirmationDelivered){
            setStep(1);
            setFormValue("");
        }
        if(isCodeMatch){
            setStep(2);
            setFormValue("");
        }
    }, [isEmailConfirmationDelivered,isCodeMatch]);


    function handlePasswordRecovery(){
        dispatch(resetPassword(value));
        setFormValue("");
    }

    function handleCodeVerify(){
        if(userId!==null){
            dispatch(codeVerify({userId:userId,
            code:value}))
        }
    }

    function handlePasswordCreate(){
        if(userId!==null){
            dispatch(createPassword({userId:userId,password:value}));
            setFormValue("");
        }
    }


    return (
        <div className="password-recovery-wrapper">
            <div className="password-recovery-wrapper-inner">
                <h1 style={{textAlign:"center"}}>{step===0?"Password recovery":stepMessages[step]}</h1>
                {error!==null||message!==null
                    &&<h1 style={{textAlign:"center",color:`${error?'red':"#a2d2ff"}`}}>{error} {message}</h1>}
                {loading&&<h1 style={{textAlign:"center"}}>{loadingMessages[step]}</h1>}
               <StepForm isLastStep={step===2} placeHolder={formPlaceHolders[step]} setValue={setFormValue}
                         value={value}
                         dispatchFunction={dispatchFunctions[step]} />
            </div>
        </div>
    );
};

export default PasswordRecovery;
