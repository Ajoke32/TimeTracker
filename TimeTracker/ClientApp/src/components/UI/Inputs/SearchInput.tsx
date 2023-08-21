import { useState } from 'react'
import { SearchInputProps } from "./InputProps";
import './inputs.css'
import searchInput from "../../../assets/images/search_input_icon.png"
export const SearchInput = ({ name, placeholder, register, onSearch }: SearchInputProps) => {
    const [value, setValue] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
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
                <button className="search-input__toggle-btn" onClick={() => { onSearch(value); }}>
                    <img src={searchInput} alt="search" />
                </button>
            </div>
        </div >
    );
};