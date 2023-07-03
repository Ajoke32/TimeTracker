import {TooltipProps} from "./TooltipProps";

export const DefaultTooltip = ({title} : TooltipProps) => {
    return (
        <div className="tooltip-wrapper">
            <p>{title}</p>
        </div>
    );
};