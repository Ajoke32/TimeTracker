import React, {useEffect, useState} from 'react';
import './PasswordRecovery.css'
import StepForm from "@components/PasswordRecoveryForms/StepForm.tsx";
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {codeVerify, createPassword, resetPassword} from "@redux/slices";

const formPlaceHolders = ['enter you email','enter code','come up with a new password']

const stepMessages = [formPlaceHolders[0],'The code was sent to the email','Create new a new password']
const PasswordRecovery = () => {

    const dispatch = useAppDispatch();


    const {isEmailConfirmationDelivered,userId,isCodeMatch,message,error} = useTypedSelector(s=>s.auth);

    const [value,setFormValue] = useState<string>("");

    const [step,setStep] = useState<number>(0);

    const dispatchFunctions = [handlePasswordRecovery,handleCodeVerify,handlePasswordCreate];

    function handlePasswordRecovery(){
        dispatch(resetPassword(value));
        setFormValue("");
    }

    function handleCodeVerify(){
        if(userId!==null){
            dispatch(codeVerify({userId:userId,
            code:value}))
            console.log(isCodeMatch);
            if(isCodeMatch){
                setStep(2);
                setFormValue("");
            }
        }
    }

    function handlePasswordCreate(){
        if(userId!==null){
            dispatch(createPassword({userId:userId,password:value}));
            setFormValue("");
        }
    }


    useEffect(() => {
        if(isEmailConfirmationDelivered){
            setStep(1);
            setFormValue("");
        }
    }, [isEmailConfirmationDelivered]);


    return (
        <div className="password-recovery-wrapper">
            <div className="password-recovery-wrapper-inner">
                <h1 style={{textAlign:"center"}}>{step===0?"Password recovery":stepMessages[step]}</h1>
                <h1 style={{textAlign:"center",color:"red"}}>{error&&error} {message&&message}</h1>
               <StepForm placeHolder={formPlaceHolders[step]} setValue={setFormValue}
                         value={value}
                         dispatchFunction={dispatchFunctions[step]} />
            </div>
        </div>
    );
};

export default PasswordRecovery;
