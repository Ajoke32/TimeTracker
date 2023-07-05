import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CheckboxInputProps, Permissions } from "./InputProps";
import { Checkbox } from "../Checkboxes";

export const CheckboxInput = ({title, options }: CheckboxInputProps) => {

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
    
    return (
        <div className="checkbox-input__wrapper">
            <div className="checkbox-input__title-wrapper"><span>{title}</span></div>
            {options.map((option) => (
                <div className="checkbox-input__wrapper-inner" key={option.toFixed()}>

                    <Checkbox key={option + 1} value={option} />
                    <label key={option}>
                        <input key={option} type="checkbox" name="" value={option} onChange={handleCheckboxChange} />
                        {Permissions[option]}
                    </label>
                </div>
            ))}
        </div>
    );
};