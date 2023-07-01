import {TooltipProps} from "./TooltipProps";
import "./tooltips.css"

const InputTooltip = ({title, url, urlTitle} : TooltipProps) => {
    return (
        <div className="tooltip-wrapper">
            <p>{title}</p>
            {url ? <a className="tooltip-link" href={url}>{urlTitle}</a> : null}
        </div>
    );
};

export default InputTooltip;