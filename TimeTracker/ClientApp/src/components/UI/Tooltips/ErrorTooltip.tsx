import React from 'react';
import { ErrorTooltipProps } from "./TooltipProps";

const ErrorTooltip = ({ errors }: ErrorTooltipProps) => {
    return (
        <div className="tooltip__wrapper error-tooltip__wrapper">
            {errors && <div><p>{errors.message}</p></div>}
        </div>
    );
};

export default ErrorTooltip;