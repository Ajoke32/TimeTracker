import React, { useEffect, useState } from 'react';
import "./calendars.css"
import { CurrentDateElement, TabSwitcher } from '..';
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import { Permission } from "@redux/enums";
import { DayPlanForm, AddEventForm } from "@components/EventForms";
import { days } from '..';
import { setPrevMonthDates, setCurrentMonthDates, setNextMonthDates, addMonth, substractMonth, GetOneMonthDateRange, GetThreeMonthDateRange } from '../../utils';
import { CalendarType, CalendarCell } from '@redux/types';
import { fetchCalendarEvents, fetchWorkPlans, setDate } from '@redux/slices';


const calendarCellsCount = 42;

export const LargeCalendar = ({ date, setter }: { date?: Date, setter: React.Dispatch<React.SetStateAction<{ cell: CalendarCell, calendar: CalendarType } | null>> }) => {
    const calendarState = useTypedSelector(state => state.calendar);
    const dispatch = useAppDispatch();

    const { currentDate, events, workPlans } = useTypedSelector(state => state.calendar);
    const { user } = useTypedSelector(state => state.auth);

    const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);
    const [isFormHidden, setIsFormHidden] = useState<CalendarCell | null>(null);
    const [tab, setTab] = useState<boolean>(true)
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
        if (currentDate.getMonth() !== new Date().getMonth())
            setIsCurrentMonth(false);
        else
            setIsCurrentMonth(true);
    })

    useEffect(() => {
        setCalendar(setValues())
    }, [calendarState.currentDate])

    useEffect(() => {
        if (date && date.getMonth() != currentDate.getMonth()) {
            handleMonthButton(date)

        }
        else if(!date) {
            dispatch(fetchWorkPlans({
                dateRange: GetThreeMonthDateRange(calendarState.currentDate),
                userId: user!.id
            }))
            dispatch(fetchCalendarEvents(GetThreeMonthDateRange(calendarState.currentDate)))
        }
    }, [])


    useEffect(() => {
        if (calendar.currentDates.length)
            setCalendar(setValues())
    }, [events, workPlans])

    const handleMonthButton = (date: Date) => {
        const dateRange = GetOneMonthDateRange(date > currentDate ? addMonth(date) : substractMonth(date))

        dispatch(setDate(date))
        dispatch(fetchWorkPlans({
            dateRange: dateRange,
            userId: user!.id
        }))
        dispatch(fetchCalendarEvents(dateRange))
    }

    const handleAddEventButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, day: CalendarCell) => {
        e.stopPropagation();
        setIsFormHidden(day)
    }

    return (
        <div className="calendar-wrapper">
            {isFormHidden && <div className="event-form__wrapper">
                <button className="event-form__close-btn" onClick={() => setIsFormHidden(null)}></button>
                <div className="event-form__inner">
                    {tab ? <DayPlanForm cell={isFormHidden} /> : <AddEventForm cell={isFormHidden} />}
                    <TabSwitcher setter={setTab} tab={tab} />
                </div>
            </div>}

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
                            onClick={() => { setter({ cell, calendar }) }}>
                            <span className={getClassName(cell, "calendar-prev__month-date")}>
                                {cell.date.getDate()}
                            </span>
                        </div>
                    ))}

                    {calendar.currentDates.map((cell, index) => (
                        <div key={index}
                            className={
                                (cell.date.getDate() === currentDate.getDate() && isCurrentMonth)
                                    ? "dates-today__date" : ""}
                            onClick={() => { setter({ cell, calendar }) }} >
                            <span className={getClassName(cell, "")}>
                                {cell.date.getDate()}
                            </span>
                            <button type="button" className="calendar-event__btn" onClick={(e) => handleAddEventButton(e, cell)} />
                        </div>
                    ))}

                    {calendar.nextDates.slice(0, calendarCellsCount - (calendar.previousDates.length + calendar.currentDates.length))
                        .map((cell, index) => (
                            <div key={index}
                                className="calendar-date__grey"
                                onClick={() => { setter({ cell, calendar }) }}>
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

const getClassName = (cell: CalendarCell, className: string): string => {
    return cell.isHoliday ? `holiday ${className}` : className;
}