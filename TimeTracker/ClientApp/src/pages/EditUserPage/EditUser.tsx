import { UserForm, Inputs } from "@components/UserForms";
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import { useEffect } from "react";
import { editUser, fetchUser } from "@redux/slices";
import { UserEditType } from "@redux/types";
import { useParams, Navigate } from "react-router-dom";

export const EditUser = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();

    if(!parseInt(userId!))
        return <Navigate to="/"/>

    useEffect(() => {
        dispatch(fetchUser(parseInt(userId!)))        
    }, []);

    const onSubmit = (data: UserEditType) => {
        dispatch(editUser(data))
    }

    return (
        <div className="user-form__wrapper">
            <UserForm formDataHandler={onSubmit} />
        </div>
    );
};