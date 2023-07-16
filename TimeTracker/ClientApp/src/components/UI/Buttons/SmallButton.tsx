import {ButtonProps} from "./ButtonProps";
import './buttons.css';

export const SmallButton = ({type, value, onClick} : ButtonProps) => {
    return (
        <div className="btn-small__wrapper">
            <button type={type} value={value} className="btn-small" onClick={onClick}>
                {value}
            </button>
        </div>
    );
};