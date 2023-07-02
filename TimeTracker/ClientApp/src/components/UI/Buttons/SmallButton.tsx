import React from 'react';
import {ButtonProps} from "./ButtonProps";
import './buttons.css';

const SmallButton = ({type, value} : ButtonProps) => {
    return (
        <div className="btn-small__wrapper">
            <button type={type} value={value} className="btn-small">
                {value}
            </button>
        </div>
    );
};

export default SmallButton;