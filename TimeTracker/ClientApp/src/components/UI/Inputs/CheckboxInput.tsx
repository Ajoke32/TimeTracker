import React, { useState, ChangeEvent, FormEvent } from 'react';
import {CheckboxInputProps, Permissions } from "./InputProps";
import Checkbox from "../Checkboxes/Checkbox";

const CheckboxInput = ({title, options} : CheckboxInputProps) => {
    
    return (
        <div className="checkbox-input__wrapper">
            <div className="checkbox-input__title-wrapper"><span>{title}</span></div>
            {options.map((option) => (
                <div className="checkbox-input__wrapper-inner" key={option.toFixed()}>
                    <Checkbox key={option + 1} value={option}/>
                    <label key={option}>
                        <input  key={option} type="checkbox" name="" value={option}/>
                        {Permissions[option]}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxInput;