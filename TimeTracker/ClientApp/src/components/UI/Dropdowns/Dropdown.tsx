import React from 'react';
import "./dropdowns.css"
import {DropDownProps} from "./DropDownProps";

const Dropdown = ({title, options } : DropDownProps) => {
    return (
        <div className="dropdown-wrapper">
            <div className="dropdown-wrapper__inner">
                <select name={title} className="dropdown-body">
                    <option disabled selected key={title}>{title}</option>
                    {options.map((option) => (
                        <option value={option.value} key={option.name}>{option.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;