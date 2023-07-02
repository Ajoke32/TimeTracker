import React from 'react';
import {TooltipProps} from "./TooltipProps";

const DefaultTooltip = ({title} : TooltipProps) => {
    return (
        <div className="tooltip-wrapper">
            <p>{title}</p>
        </div>
    );
};

export default DefaultTooltip;