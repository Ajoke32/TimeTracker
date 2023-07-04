import React from 'react';
import "./radiobuttons.css"

interface RadioButtonProps  {
    data: any[]
}


const RadioButton = ({data}) => {
    
    
    return (
        <div className="radio-button__wrapper">
            <div>
                <label>
                    <input type="radio" name="radio"/>
                        <span>Full-time</span>
                </label>
                <label>
                    <input type="radio" name="radio"/>
                        <span>Part-time</span>
                </label>
            </div>
        </div>
    );
};

export default RadioButton;