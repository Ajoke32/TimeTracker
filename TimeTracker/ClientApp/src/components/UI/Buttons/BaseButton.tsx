import React from 'react';

interface BaseButtonProps{
    disabled:boolean,
    btnStyle:string,
    text:string,
    onClick?:Function
}
const BaseButton = ({disabled, btnStyle, text,onClick}:BaseButtonProps) => {
    return (
            <button onClick={()=>onClick&&onClick()} className={`btn-base btn-${btnStyle}  ${disabled&&'disabled'}`} disabled={disabled}>
                {text}
            </button>
    );
};

export default BaseButton;
