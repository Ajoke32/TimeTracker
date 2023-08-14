import { months } from "../../";

export const CurrentDateElement = ({date, showFullDate = false} : {date: Date, showFullDate: boolean}) => {

    const currentDate = showFullDate 
        ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` 
        : `${months[date.getMonth()]} ${date.getFullYear()}`;
    
    return (
        <div className="current-date__wrapper">
            <span>{currentDate}</span>
        </div>
    );
};