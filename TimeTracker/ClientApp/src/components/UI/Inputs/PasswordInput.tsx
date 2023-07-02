import { useState } from 'react';
import { TextInputProps } from "./InputProps";
import './inputs.css'
import ErrorTooltip from "../Tooltips/ErrorTooltip";

const PasswordInput = ({ name, placeholder, register, errors }: TextInputProps) => {

    const [showPassword, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!showPassword);
    };

    return (
        <div className="input-wrapper">
            <input type={showPassword ? 'text' : 'password'} name={name} placeholder={placeholder} {...register} className="text-input" autoComplete='off'/>
            <ErrorTooltip errors={errors} />
            <button type="button" className="password-input__toggle-btn" onClick={togglePasswordVisibility}>
                <img src={showPassword ? (require("../../../assets/images/hide_password_icon.png")) : require("../../../assets/images/show_password_icon.png")} alt="" />
            </button>
        </div>
    );
};

export default PasswordInput;