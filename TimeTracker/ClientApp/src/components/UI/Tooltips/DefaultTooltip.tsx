import React from 'react';
import {TooltipProps} from "./TooltipProps";

const DefaultTooltip = ({description} : TooltipProps) => {
    return (
        <div className="tooltip-wrapper">
            <p>{description}</p>
        </div>
    );
};

export default DefaultTooltip;