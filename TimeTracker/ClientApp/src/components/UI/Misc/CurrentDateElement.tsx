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


const CurrentDateElement = ({date} : {date: Date}) => {

    const currentDate = `${date.getDate()} ${months[date.getMonth()]}`;
    
    return (
        <div className="current-date__wrapper">
            <span>{(date.getDate() === new Date().getDate()) && (date.getMonth() === new Date().getMonth()) ? "Today" : ""}</span>
            <span>{currentDate}</span>
        </div>
    );
};

export default CurrentDateElement;