import React from 'react';
import { forwardRef, Ref } from 'react';
import {TextInputProps} from "./InputProps";
import './inputs.css'
import ErrorTooltip from "../Tooltips/ErrorTooltip";

const TextInput = forwardRef((props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    const { name, placeholder, errors } = props;

    return (
        <div>
            <input type="text" name={name} placeholder={placeholder} ref={ref}  className="text-input" />
            <ErrorTooltip errors={errors} />
        </div>
    );
});

export default TextInput;