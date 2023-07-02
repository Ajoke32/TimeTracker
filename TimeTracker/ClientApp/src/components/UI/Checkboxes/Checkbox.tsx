import React, { ChangeEvent } from 'react';
import "./checkboxes.css"

interface CheckboxProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: number;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, value }) => {
    return (
        <div className="checkbox-wrapper">
            <label className="checkbox-inner">
                <input type="checkbox" onChange={onChange} value={value} />
                <div className="checkbox-checkmark"></div>
            </label>
        </div>
    );
};

export default Checkbox;