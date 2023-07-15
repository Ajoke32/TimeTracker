import { CheckboxInputProps, Permissions } from "./InputProps";
import { Checkbox } from "../Checkboxes";

export const CheckboxInput = ({ title, options, values, selected, setSelected, isMultipleChoice }: CheckboxInputProps) => {
    const handleCheckboxChange = (value: number, checked: boolean) => {
        const updatedValue = isMultipleChoice ? (checked ? (selected | value) : (selected & ~value)) : (checked ? value : 0);

        setSelected(updatedValue);
    };

    return (
        <div className="checkbox-input__wrapper">
            <div className="checkbox-input__title-wrapper">
                <span>{title}</span>
            </div>
            {options.map((option) => {
                const isChecked = (selected & option) === option;

                return (
                    <div className="checkbox-input__wrapper-inner" key={option.toFixed()}>
                        <Checkbox
                            key={option + 1}
                            value={option}
                            isChecked={isChecked}
                            optionName={values[option]}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                );
            })}
        </div>
    );
};