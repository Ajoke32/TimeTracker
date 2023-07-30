import React from 'react';

interface CalendarNavProps{
    monthChanged:(e: React.MouseEvent<HTMLButtonElement>)=>void;
    day:number,
    month:string,
    year:number
}
const CalendarNav = ({day,month,year,monthChanged}:CalendarNavProps) => {
    return (
        <div className="calendar-nav">
            <button id="prev" className="arrow" onClick={(e) => monthChanged(e)}>&larr;</button>
            <span>{day} {month} {year}</span>
            <button id="next" className="arrow" onClick={(e) => monthChanged(e)}>&rarr;</button>
        </div>
    );
};

export default CalendarNav;
