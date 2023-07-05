import {TextInputProps} from "./InputProps";
import './inputs.css'
import { ErrorTooltip } from "../Tooltips";

export const SearchInput = ({ name, placeholder, register, errors }: TextInputProps) => {

    return (
        <div className="input-wrapper">
            <div className="input-wrapper__inner">
                <input type="search" name={name} placeholder={placeholder} {...register} className="search-input" autoComplete='off'/>
                <button className="search-input__toggle-btn">
                    <img src={require("../../../assets/images/search_input_icon.png")}  alt="search"/>
                </button>
            </div>
        </div>
    );
};