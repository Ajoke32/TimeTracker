import { CheckboxInputProps, Permissions } from "./InputProps";
import { Checkbox } from "../Checkboxes";

export const CheckboxInput = ({ title, options, selected, setSelected }: CheckboxInputProps) => {

   

    return (
        <div className="checkbox-input__wrapper">
            <div className="checkbox-input__title-wrapper"><span>{title}</span></div>
            {options.map((option) => (
                <div className="checkbox-input__wrapper-inner" key={option.toFixed()}>

                    <Checkbox key={option + 1} value={option} selected={selected} setSelected={setSelected}/>

                </div>
            ))}
        </div>
    );
};