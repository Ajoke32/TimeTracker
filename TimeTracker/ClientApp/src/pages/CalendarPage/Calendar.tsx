import React from 'react';
import LargeCalendar from "@components/Calendar/LargeCalendar";
import "./Calendar.css"

const Calendar = () => {
    return (
        <div className="calendar-page__wrapper">
            <LargeCalendar/>
        </div>
    );
};

export default Calendar;