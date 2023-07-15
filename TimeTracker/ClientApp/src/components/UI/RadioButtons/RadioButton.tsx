import "./radiobuttons.css"
import { useState } from 'react';

interface RadioButtonProps {
    options: number[],
    title: string,
    name: string,
    register: any,
}

export const RadioButton = ({ title, options, name, register }: RadioButtonProps) => {

    const [selectedOption, setSelectedOption] = useState<number>(50);
    
    

    return (
        <div className="radio-button__wrapper">
            <div className="radio-button__title-wrapper"><span>{title}</span></div>
            <div className="radio-button__options-wrapper">
                {options.map((percentage) => (
                    <label key={percentage}>
                        <input {...register}
                            value={percentage}
                            type="radio"
                            checked={percentage === selectedOption}
                            onChange={() => { setSelectedOption(percentage) }}
                        />
                        <span>{percentage}%</span>
                    </label>
                ))}
            </div>
        </div>
    );
};