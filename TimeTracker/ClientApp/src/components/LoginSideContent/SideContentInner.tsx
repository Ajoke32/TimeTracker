import React from 'react';
import "./LoginSideContent.css"
import H2 from "../Headings/H2";
import DefaultTooltip from "../UI/Tooltips/DefaultTooltip";
import SideContentImage from "./SideContentImage";

const SideContentInner = () => {
    return (
        <div className="side-content__inner">
            <H2 value="Be effective"/>
            <DefaultTooltip title="Optimize your work processes and accomplish more"/>
            <SideContentImage/>
        </div>
    );
};

export default SideContentInner;