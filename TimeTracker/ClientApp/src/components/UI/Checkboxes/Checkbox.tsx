import React, { ChangeEvent } from 'react';
import "./checkboxes.css"

interface CheckboxProps {
    value: number;
    optionName: string | number | boolean | null;
    selected?: number,
    setSelected?: (value: number) => void
    isMultipleChoice: boolean,

    onChange?: (value: number, checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
      value, 
      selected = 0, 
      setSelected = () => {}, 
      onChange = () => {},
      optionName, 
      isMultipleChoice, 
    }: CheckboxProps) => {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        if (isMultipleChoice) {
            if (checked) {
                setSelected(selected += Number(value));
            } else {
                setSelected(selected -= Number(value));
            }
        } else {
            onChange(Number(value), checked);
        }
    };

    return (
        <div className="checkbox-wrapper" key={value}>
            <label className="checkbox-inner">
                <input key={value} type="checkbox" value={value} onChange={handleCheckboxChange}/>
                <div className="checkbox-checkmark" />
                <span>{optionName}</span>
            </label>
        </div>
    );
};