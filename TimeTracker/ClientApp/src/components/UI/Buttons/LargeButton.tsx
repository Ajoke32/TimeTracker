﻿import React from 'react';
import {ButtonProps} from "./ButtonProps";
import './buttons.css';

const LargeButton = ({type, value} : ButtonProps) => {
    return (
        <div>
            <button type={type} value={value} className="btn-large">
                {value}
            </button>
        </div>
    );
};

export default LargeButton;