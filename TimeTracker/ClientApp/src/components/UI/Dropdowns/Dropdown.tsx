import "./dropdowns.css"
import { DropDownProps } from "./DropDownProps";
import React from "react";


export const Dropdown = ({ title, options,onSelectChange }: DropDownProps) => {

    return (
        <div className="dropdown-wrapper">
            <div className="dropdown-wrapper__inner">
                <select onChange={onSelectChange}  name={title} className="dropdown-body" defaultValue="" >
                    <option value="all" key={title}>{title}</option>
                    {options.map((option) => (
                        <option value={option.value} key={option.name}>{option.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};