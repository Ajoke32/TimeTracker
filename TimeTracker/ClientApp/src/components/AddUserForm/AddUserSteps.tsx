import { useAppDispatch } from "../../hooks";
import { useState } from 'react';
import { RadioButton } from "../UI/RadioButtons"
import { TextInput, CheckboxInput, SmallButton } from "../UI";
import { useForm, SubmitHandler } from 'react-hook-form';
import AddApproversForm from "./AddApproversForm";
import {AddUserForm} from "./AddUserForm";
import "./AddUserForms.css"

export const AddUserSteps = () => {
    
    const [step, setStep] = useState<number>(0);
    
    const handleNextStep = () => {
        setStep(2);
    }
    
    switch (step) {
        case 0:
            return (
                <div className="add-user-form__wrapper">
                    <AddUserForm onNextStep={handleNextStep}/>
                </div>
            )
        default:
            return (
                <div className="add-user-form__wrapper">
                    <AddApproversForm/>
                </div>
            )
    }
}
