import React from 'react';
import {Hr} from "./Hr";

interface StepsElementProps {
    title: string,
    currentStep: number;
}

const StepsElement = ({title, currentStep} : StepsElementProps) => {
    return (
        <div className="steps-element__wrapper">
            <span className="steps-element__title">{title}</span>
            <div className="steps-element__hr-wrapper">
                <Hr isHighlighted={currentStep === 1} />
                <Hr isHighlighted={currentStep === 2} />
            </div>
        </div>
    );
};

export default StepsElement;