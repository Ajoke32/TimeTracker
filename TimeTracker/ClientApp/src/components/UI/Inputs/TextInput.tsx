import {TextInputProps} from "./InputProps";
import './inputs.css'
import ErrorTooltip from "../Tooltips/ErrorTooltip";

const TextInput =  ({ name, placeholder, register, errors }: TextInputProps) => {

    return (
        <div>
            <input type="text" name={name} placeholder={placeholder} {...register} className="text-input" autoComplete='off'/>
            <ErrorTooltip errors={errors} />
        </div>
    );
};

export default TextInput;