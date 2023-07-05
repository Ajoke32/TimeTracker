import "./LoginSideContent.css"
import { H2 } from "../Headings";
import { DefaultTooltip } from "../UI/Tooltips";
import { SideContentImage } from "./";

export const SideContentInner = () => {
    return (
        <div className="side-content__inner">
            <H2 value="Be effective" />
            <DefaultTooltip description="Optimize your work processes and accomplish more" />
            <SideContentImage />
        </div>
    );
};