import { useTypedSelector } from "../../hooks";
import { useState, useEffect } from 'react';
import AddApproversForm from "./AddApproversForm";
import {AddUserForm} from "./AddUserForm";
import "./AddUserForms.css"
import EditUserForm from "./EditUserForm";


export const AddUserSteps = () => {
    
    const [step, setStep] = useState<number>(0);
    const [dispatched, setDispatched] = useState<string>()

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

    const handleNextStep = (dispatchedType: string) => {
        setDispatched(dispatchedType)
    }
    
    switch (step) {
        case 0:
            return (
                <div className="user-form__wrapper">
                    <AddUserForm onNextStep={handleNextStep}/>
                </div>
            )
        default:
            return (
                <div className="user-form__wrapper">
                    <AddApproversForm/>
                </div>
            )
    }
}
