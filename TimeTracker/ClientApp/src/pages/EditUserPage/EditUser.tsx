import React from 'react';
import EditUserForm from "../../components/AddUserForm/EditUserForm";
import { user } from '../../redux';

const EditUser = () => {
    return (
        <div className="user-form__wrapper">
            <EditUserForm firstName={"John"} lastName={"Doe"} email={"someemail@gmail.com"}  permissions={15} vacationDays={25} hoursPerMonth={75}/>
        </div>
    );
};

export default EditUser;