import {SearchInputProps} from "./InputProps";
import './inputs.css'

export const SearchInput = ({ name, placeholder, register, errors, onSearch, isDisabled }: SearchInputProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onSearch(value);
    };
    
    
    return (
        <div className="input-wrapper">
            <div className="input-wrapper__inner">
                <input 
                    type="search" 
                    name={name} 
                    placeholder={placeholder} 
                    {...register} 
                    onChange={handleInputChange}
                    className="search-input" 
                    autoComplete='off'
                    />
                <button className="search-input__toggle-btn">
                    <img src={require("../../../assets/images/search_input_icon.png")}  alt="search"/>
                </button>
            </div>
        </div>
    );
};