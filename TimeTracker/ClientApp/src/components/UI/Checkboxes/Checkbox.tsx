import React, { ChangeEvent } from 'react';
import "./checkboxes.css"

interface CheckboxProps {
    value: number;
}

const Checkbox: React.FC<CheckboxProps> = ({ value }) => {
    return (
        <div className="checkbox-wrapper">
            <label className="checkbox-inner">
                <input type="checkbox" value={value} />
                <div className="checkbox-checkmark"></div>
            </label>
        </div>
    );
};

export default Checkbox;