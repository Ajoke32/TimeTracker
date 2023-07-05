import React from 'react';
import "./radiobuttons.css"

interface RadioButtonProps  {
    options: string[],
    title: string
}


export const RadioButton = ({title, options} : RadioButtonProps) => {
    
    
    return (
        <div className="radio-button__wrapper">
            <div className="radio-button__title-wrapper"><span>{title}</span></div>
            <div className="radio-button__options-wrapper">
                {options.map((option) => (
                    <label key={option}>
                        <input type="radio" name="radio"/>
                        <span>{option}</span>
                    </label>
                    ))}
            </div>
        </div>
    );
};