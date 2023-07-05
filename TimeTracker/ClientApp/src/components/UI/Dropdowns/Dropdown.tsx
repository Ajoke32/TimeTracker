import React from 'react';
import "./dropdowns.css"
import {DropDownProps} from "./DropDownProps";

const Dropdown = ({options, title} : DropDownProps) => {
    return (
        <div className="dropdown-wrapper">
            <label htmlFor="touch"><span className="dropdown-span">{title}</span></label>
            <input type="checkbox" id="touch"/>

                <ul className="slide">
                    {options.map((option) => (
                        <li><span>{option}</span></li>
                    ))}
                </ul>
        </div>
    );
};

export default Dropdown;