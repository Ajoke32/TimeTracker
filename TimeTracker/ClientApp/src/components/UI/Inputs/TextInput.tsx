import React from 'react';
import { TextInputProps } from "./InputProps";
import './inputs.css'

const TextInput = ({ name, placeholder, register, errors }: TextInputProps) => {

    return (
        <div>
            <input type="text" name={name} placeholder={placeholder} {...register} className="text-input" autoComplete='off' />
            {errors && <div>{errors.message}</div>}
        </div>
    );
};

export default TextInput;