import React from 'react';
import {DayOfMoth} from "@components/Calendar/Calendar.tsx";

interface CalendarBodyProps{
    days:DayOfMoth[],
    handleDayClick:(day:number)=>void,
    currentDay:number,
    selectedDay:number
}

const CalendarBody = ({days,handleDayClick,currentDay,selectedDay}:CalendarBodyProps) => {
    return (
        <div className="calendar-wrapper">
            {days.map(i =>
                <div onClick={() => handleDayClick(i.day)}
                     className={`item ${i.haveEvents&&'event-mark'} ${!i.isCurrentMoth ? 'inactive' : 'active'}
                      ${(i.day === currentDay && i.isCurrentMoth) && 'current-day'}
                      ${(i.day===selectedDay&&i.isCurrentMoth)&&'selected'}`}
                     key={Math.random()}>
                    <span style={{color:`${!i.isCurrentMoth&&'#adb5bd'}`}}>{i.day}</span>
                </div>)}
        </div>
    );
};

export default CalendarBody;
