import './errorPages.css'
import notFoundGif from "../../assets/images/page_not_found.gif";
import { H3 } from '@components/Headings';

export const NotFound = () => {
    return(
        <div className="wrapper">
            <div className="inner">
                <img src={notFoundGif} className="error-gif" />
                <H3 value='Page not found'/>
            </div>

        </div>
    )
}