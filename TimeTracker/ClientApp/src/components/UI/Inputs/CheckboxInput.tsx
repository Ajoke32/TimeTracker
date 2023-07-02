import React, { useState, ChangeEvent, FormEvent } from 'react';
import {CheckboxInputProps, Permissions } from "./InputProps";
import Checkbox from "../Checkboxes/Checkbox";
import DefaultTooltip from "../Tooltips/DefaultTooltip";
import ErrorTooltip from "../Tooltips/ErrorTooltip";

const CheckboxInput = ({options} : CheckboxInputProps) => {
    
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const selectedValue = Number(value);
        
        if (checked && selectedValue === 0) {
            setSelectedOptions([selectedValue]);
        }
        else if (checked) {
            setSelectedOptions((prevSelected: number[]) => [...prevSelected, selectedValue]);
        } else {
            setSelectedOptions((prevSelected: number[]) => prevSelected.filter((option: number) => option !== selectedValue));
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(selectedOptions);
    };
    
    return (
        <div className="checkbox-input__wrapper">
            <div className="checkbox-input__title-wrapper"><span>Select user permissions:</span></div>
            {options.map((option) => (
                <div className="checkbox-input__wrapper-inner" key={option.toFixed()}>
                    <Checkbox key={option + 1} onChange={handleCheckboxChange} value={option}/>
                    <label key={option}>
                        <input  key={option} type="checkbox" name="" value={option} onChange={handleCheckboxChange}/>
                        {Permissions[option]}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxInput;