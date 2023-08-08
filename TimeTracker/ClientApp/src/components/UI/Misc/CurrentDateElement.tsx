
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


export const CurrentDateElement = ({date, showFullDate = false} : {date: Date, showFullDate: boolean}) => {

    const currentDate = showFullDate 
        ? ` ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` 
        : `${months[date.getMonth()]} ${date.getFullYear()}`;
    
    return (
        <div className="current-date__wrapper">
            <span>{currentDate}</span>
        </div>
    );
};