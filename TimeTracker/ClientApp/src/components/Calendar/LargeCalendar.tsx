import React, { useEffect, useState } from 'react';
import "./calendars.css"
import { CurrentDateElement } from '..';
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import { days } from '..';
import { setPrevMonthDates, setCurrentMonthDates, setNextMonthDates, addMonth, substractMonth, GetOneMonthDateRange, GetThreeMonthDateRange } from '../../utils';
import { CalendarType, CalendarCell } from '@redux/types';
import { fetchCalendarEvents, fetchWorkPlans, setDate } from '@redux/slices';
import { CalendarModal } from '../UI/Modals';

interface CalendarProps {
    date?: Date,
    setter: React.Dispatch<React.SetStateAction<CalendarCell | null>>
}

const calendarCellsCount = 42;

export const LargeCalendar = ({ date, setter }: CalendarProps) => {
    const calendarState = useTypedSelector(state => state.calendar);
    const dispatch = useAppDispatch();

    const { currentDate, events, workPlans } = useTypedSelector(state => state.calendar);
    const { user } = useTypedSelector(state => state.auth);

    const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);
    const [isFormHidden, setIsFormHidden] = useState<Date | null>(null);
    const [calendar, setCalendar] = useState<CalendarType>(
        {
            previousDates: [],
            currentDates: [],
            nextDates: [],
        }
    );

    const setValues = (): CalendarType => ({
        previousDates: setPrevMonthDates(currentDate, events.previousMonth, workPlans.previousMonth),
        currentDates: setCurrentMonthDates(currentDate, events.currentMonth, workPlans.currentMonth),
        nextDates: setNextMonthDates(currentDate, events.nextMonth, workPlans.nextMonth),
    })

    useEffect(() => {
        if (!date) {
            dispatch(fetchWorkPlans({
                dateRange: GetThreeMonthDateRange(calendarState.currentDate),
                userIds: [user!.id]
            }))
            dispatch(fetchCalendarEvents(GetThreeMonthDateRange(calendarState.currentDate)))
        }
        else if (date.getMonth() != currentDate.getMonth()) {
            handleMonthButton(date)
        }
    }, [])

    useEffect(() => {
        setIsCurrentMonth(currentDate.getMonth() == new Date().getMonth());
        setCalendar(setValues())
    }, [calendarState.currentDate])


    useEffect(() => {
        if (calendar.currentDates.length)
            setCalendar(setValues())
    }, [events, workPlans])

    const handleMonthButton = (date: Date) => {
        const dateRange = GetOneMonthDateRange(date > currentDate ? addMonth(date) : substractMonth(date))

        dispatch(setDate(date))
        dispatch(fetchWorkPlans({
            dateRange: dateRange,
            userIds: [user!.id]
        }))
        dispatch(fetchCalendarEvents(dateRange))
    }

    const handleAddEventButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, day: CalendarCell) => {
        e.stopPropagation();
        setIsFormHidden(day.date)
    }

    return (
        <div className="calendar-wrapper">
            <CalendarModal isHidden={isFormHidden} setIsHidden={setIsFormHidden} />

            <div className="calendar-header__wrapper">
                <div className="calendar-date__wrapper">
                    <CurrentDateElement date={currentDate} showFullDate={false} />
                </div>
                <div className="calendar-actions">
                    <div>
                        <button onClick={() => handleMonthButton(substractMonth(currentDate))}></button>
                        <button onClick={() => handleMonthButton(addMonth(currentDate))}></button>
                    </div>
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
                    {calendar.previousDates.map((cell, index) => (
                        <div key={index}
                            className="calendar-date__grey"
                            onClick={() => { setter(cell) }}>
                            <span className={getClassName(cell, "calendar-prev__month-date")}>
                                {cell.date.getDate()}
                            </span>
                        </div>
                    ))}

                    {calendar.currentDates.map((cell, index) => (
                        <div key={index}
                            className={
                                (cell.date.getDate() === new Date().getDate() && isCurrentMonth)
                                    ? "dates-today__date" : ""}
                            onClick={() => { setter(cell) }} >
                            <span className={getClassName(cell)}>
                                {cell.date.getDate()}
                            </span>
                            <button type="button" className="calendar-event__btn" onClick={(e) => {
                                handleAddEventButton(e, cell)
                            }} />
                        </div>
                    ))}

                    {calendar.nextDates.slice(0, calendarCellsCount - (calendar.previousDates.length + calendar.currentDates.length))
                        .map((cell, index) => (
                            <div key={index}
                                className="calendar-date__grey"
                                onClick={() => { setter(cell) }}>
                                <span className={getClassName(cell, "calendar-prev__month-date")}>
                                    {cell.date.getDate()}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const getClassName = (cell: CalendarCell, className?: string): string => {
    return cell.isHoliday ? `holiday ${className ?? ''}` : className ?? "";
}