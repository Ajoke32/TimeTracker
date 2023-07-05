import {ButtonProps} from "./ButtonProps";
import './buttons.css';

export const SmallButton = ({type, value} : ButtonProps) => {
    return (
        <div className="btn-small__wrapper">
            <button type={type} value={value} className="btn-small">
                {value}
            </button>
        </div>
    );
};