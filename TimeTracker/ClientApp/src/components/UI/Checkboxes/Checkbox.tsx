import React, { useState, ChangeEvent, FormEvent } from 'react';import "./checkboxes.css"
import { Permissions } from "../Inputs/InputProps";

interface CheckboxProps {
    value: number;
    selected: number,
    setSelected: (value: number) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, selected, setSelected }: CheckboxProps) => {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelected(selected += Number(value));
        } else {
            setSelected(selected -= Number(value));
        }
    };

    return (
        <div className="checkbox-wrapper" key={value}>
            <label className="checkbox-inner">
                <input key={value} type="checkbox" value={value} onChange={handleCheckboxChange}/>
                <div className="checkbox-checkmark" />
                <span>{Permissions[value]}</span>
            </label>
        </div>
    );
};