import React from 'react';

interface BaseButtonProps{
    disabled:boolean,
    btnStyle:string,
    text:string
}
const BaseButton = ({disabled, btnStyle, text}:BaseButtonProps) => {
    return (
            <button  className={`btn-base btn-${btnStyle} ${disabled&&'disabled'}`} disabled={disabled}>
                {text}
            </button>
    );
};

export default BaseButton;
