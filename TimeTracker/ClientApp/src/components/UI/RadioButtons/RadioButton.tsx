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
<<<<<<< HEAD
                {options.map((percentage) => (
                    <label key={percentage}>
                        <input {...register}
                            value={percentage}
                            type="radio"
                            checked={percentage === selectedOption}
                            onChange={() => { setSelectedOption(percentage) }}
                        />
                        <span>{percentage}%</span>
=======
                {options.map((option) => (
                    <label key={option}>
                        <input type="radio" name="radio"/>
                        <span>{option}</span>
>>>>>>> 0aeef1a39958325a784fd2bfeb0fcc527e6ca99e
                    </label>
                ))}
            </div>
        </div>
    );
};