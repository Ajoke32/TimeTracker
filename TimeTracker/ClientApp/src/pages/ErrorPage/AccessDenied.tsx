import './errorPages.css'
import notFoundGif from "../../assets/images/page_not_found.gif";
import { H3 } from '@components/Headings';

export const AccessDenied = () => {
    return(
        <div className="wrapper">
            <div className="inner">
                <img src={notFoundGif} className="error-gif" />
                <H3 value='Access denied!'/>

            </div>
        </div>
    )
}