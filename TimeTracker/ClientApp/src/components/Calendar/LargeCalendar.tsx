import React, {useEffect, useState} from 'react';
import "./calendars.css"
import { CurrentDateElement } from '..';
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks";
import {setDefault, setNextMonth, setPreviousMonth} from "@redux/slices";
import {Permission} from "@redux/enums";
import AddEventForm from "@components/EventForms/AddEventForm";

const days = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
];

const calendarCellsCount = 42;

const LargeCalendar = () => {
    const dispatch = useAppDispatch();
    const calendar = useTypedSelector(state => state.calendar);
    const authState = useTypedSelector(state => state.auth);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);
    const [isFormHidden, setIsFormHidden] = useState<boolean>(true);
    
    useEffect(() => {
        if (calendar.currentDate.getMonth() !== new Date().getMonth())
            setIsCurrentMonth(false);
        else 
            setIsCurrentMonth(true);
    })
    
    const handlePrevMonthButton = () => {
        dispatch(setPreviousMonth());
    }

    const handleNextMonthButton = () => {
        dispatch(setNextMonth());
    }
    
    const handleShowDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }
    
    const handleAddEventButton = () => {
        setIsFormHidden(!isFormHidden)
    }

    return (
        <div className="calendar-wrapper">
            {!isFormHidden && <div className="event-form__wrapper">
                <button className="event-form__close-btn"  onClick={handleAddEventButton}></button>
                <AddEventForm/>
            </div>}
            
            <div className="calendar-header__wrapper">
                <div className="calendar-date__wrapper"><CurrentDateElement date={calendar.currentDate} /></div>
                <div className="calendar-actions">
                    <div>
                        <button onClick={handlePrevMonthButton}></button>
                        <button onClick={handleNextMonthButton}></button>
                    </div>
                    <button onClick={handleShowDatePicker} className="show-datepicker__btn">
                        <input
                            type="date"
                            className="date-picker__input"
                            style={showDatePicker ? {display: 'none'} : {}}
                        />
                    </button>
                </div>
            </div>

            <div className="calendar-content">
                <div className="calendar-days-header">
                    {days.map((day, index) => (
                    <div key={index} className="days-header__day">
                      <span>
                        {day}
                      </span>
                    </div>
                    ))}
                </div>
                <div className="calendar-dates">
                    {calendar.previousDates.map((day, index) => (
                        <div key={index} className="calendar-date__grey">
                          <span className="calendar-prev__month-date">
                            {day}
                          </span>
                        </div>
                    ))}
                    
                    {calendar.currentDates.map((day, index) => (
                        <div key={index} className={(day === calendar.currentDate.getDate() && isCurrentMonth) ? "dates-today__date" : ""}>
                            <span>
                                {day}
                            </span>
                            {(authState.user!.permissions & Permission.Create)
                                ? <button type="button" className="calendar-event__btn" onClick={handleAddEventButton}></button>
                                : <div></div>}
                        </div>
                    ))}
                    
                    {calendar.nextDates.slice(0, calendarCellsCount - (calendar.previousDates.length + calendar.currentDates.length))
                        .map((day, index) => (
                            <div key={index} className="calendar-date__grey">
                          <span className="calendar-prev__month-date">
                            {day}
                          </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default LargeCalendar;