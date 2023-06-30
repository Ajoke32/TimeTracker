import React, {useState} from 'react';
import {PasswordInputProps} from "./InputProps";
import './inputs.css'

const PasswordInput = ({ name, placeholder, register, errors } : PasswordInputProps) => {

    const [showPassword, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!showPassword);
    };
    
    return (
        <div className="input-wrapper">
            <input type={showPassword ? 'text' : 'password'} value={password}  onChange={(e) => setPassword(e.target.value)} name={name} placeholder={placeholder} ref={register} className="text-input" />
            {errors && <div>{errors.message}</div>}
            <button type="button" className="password-input__toggle-btn" onClick={togglePasswordVisibility}>
                <img src={ showPassword ? (require("../../../assets/images/hide_password_icon.png")) : require("../../../assets/images/show_password_icon.png")} alt=""/>
            </button>
        </div>
    );
};

export default PasswordInput;