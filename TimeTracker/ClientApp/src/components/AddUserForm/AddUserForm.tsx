import "./AddUserForm.css"
import { Steps } from './FormSteps'
import { useAppDispatch } from "../../hooks";


export const AddUserForm = () => {

    return (
        <div className="user-form__wrapper-inner">
            <Steps />
        </div>
    );
};