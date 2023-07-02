import React, { useState } from 'react';
import { forwardRef, Ref } from 'react';
import { TextInputProps } from "./InputProps";
import './inputs.css'
import ErrorTooltip from "../Tooltips/ErrorTooltip";

const PasswordInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (props: TextInputProps, ref) => {
        const { name, placeholder, errors } = props;
    const [showPassword, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!showPassword);
    };
    
    return (
        <div className="input-wrapper">
            <input type={showPassword ? 'text' : 'password'} value={password}  onChange={(e) => setPassword(e.target.value)} name={name} placeholder={placeholder} ref={ref} className="text-input" />
            <ErrorTooltip errors={errors}/>
            <button type="button" className="password-input__toggle-btn" onClick={togglePasswordVisibility}>
                <img src={ showPassword ? (require("../../../assets/images/hide_password_icon.png")) : require("../../../assets/images/show_password_icon.png")} alt=""/>
            </button>
        </div>
    );
});

export default PasswordInput;