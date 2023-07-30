import React from 'react';

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


const CurrentDateElement = ({date, showFullDate} : {date: Date, showFullDate: boolean}) => {
    
    const currentDate = ((showFullDate))
        ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        : `${months[date.getMonth()]} ${date.getFullYear()}`;
    
    return (
        <div className="current-date__wrapper">
            <span>{currentDate}</span>
        </div>
    );
};

export default CurrentDateElement;