import "./AddUser.css"
import { useState, useEffect } from 'react';
import { UserForm, AddApproversForm } from "@components/UserForms";
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import { userAdd } from "@redux/slices";
import { UserAddType, UserType } from "@redux/types";

export const AddUser = () => {
    const dispatch = useAppDispatch();
    const [step, setStep] = useState<number>(0);
    const [dispatched, setDispatched] = useState<string>()

    const { loading, error, message } = useTypedSelector(state => state.user);

    useEffect(() => {
        if (dispatched === 'user/userAdd') {
            if (!error && !loading)
                setStep(1);
        }
    }, [loading]);

    const onSubmit = (data: UserType) => {
        const userData: UserAddType = {
            ...data,
            vacationDays: 30
        }
        setDispatched(dispatch(userAdd(userData)).type);
    }

    switch (step) {
        case 0:
            return (
                <div className="user-form__wrapper">
                    <UserForm formDataHandler={onSubmit} step={1} />
                </div>
            )
        default:
            return (
                <div className="user-form__wrapper">
                    <AddApproversForm step={2} />
                </div>
            )
    }
};