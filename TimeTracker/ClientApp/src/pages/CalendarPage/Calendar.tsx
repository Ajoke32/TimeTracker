import React from 'react';
import LargeCalendar from "@components/Calendar/LargeCalendar";
import "./Calendar.css"
import Scheduler from "@components/Scheduler/Scheduler.tsx";

const Calendar = () => {
    return (
        <div className="calendar-page__wrapper">
            
            {/*<LargeCalendar/>*/}
            <Scheduler date={new Date()}/>
        </div>
    );
};

export default Calendar;