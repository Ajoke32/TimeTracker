import { ErrorTooltipProps } from "./TooltipProps";

export const ErrorTooltip = ({ errors }: ErrorTooltipProps) => {
    return (
        <div className="error-tooltip__wrapper">
            {errors && <div><p>{errors.message}</p></div>}
        </div>
    );
};