import React, { ChangeEvent, FormEvent, useState } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import TextInput from "../UI/Inputs/TextInput";
import PasswordInput from "../UI/Inputs/PasswordInput";
import SmallButton from "../UI/Buttons/SmallButton";
import "./AddUserForm.css"
import RadioButton from "../UI/RadioButtons/RadioButton";
import CheckboxInput from "../UI/Inputs/CheckboxInput";

enum Permissions {
    Create = 1,
    Update = 2,
    Delete = 4,
    Read = 8,
}

const options: Permissions[] = [
    Permissions.Create,
    Permissions.Update,
    Permissions.Delete,
    Permissions.Read,
];


    interface FormData {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
        
const AddUserForm = () => {


    
    
    return (
        <div className="user-form__wrapper-inner">
            <form>
                <TextInput name="firstName" placeholder="First name"/>

                <TextInput name="lastName" placeholder="Last name"/>

                <TextInput name="email" placeholder="Enter email"/>

                <PasswordInput name="password" placeholder="Password"/>

                <RadioButton/>

                <CheckboxInput options={options}/>

                <SmallButton type="submit" value="Add user"/>
            </form>
        </div>
    );
};

export default AddUserForm;