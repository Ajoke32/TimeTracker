import './scheduler.css';
import "../Calendar/calendars.css"
import { useState, useEffect } from 'react';
import {CurrentDateElement} from "@components/UI";
import { H4 } from "@components/Headings";
import { CalendarType, CalendarCell, SchedulerWorkedHour, SchedulerWorkPlan } from '@redux/types';
import { useAppDispatch, useTypedSelector } from '@hooks/customHooks';
import { GetFormattedTimeDifference, addDay, createCalendarCell, generateColors, substractDay } from '../../utils';
import { SchedulerModal, UsersTableSmall, hours } from '..';
import { TimeRow } from './TimeRow';
import { resetUsersWorkPlans, userFiltersToDefault } from '@redux/slices';

export const Scheduler = ({ cell, back }: { cell: CalendarCell, back: (selectedDate: Date) => void }) => {
    const dispatch = useAppDispatch()

    const calendar = useTypedSelector(state => state.calendar);
    const { user } = useTypedSelector(state => state.auth)

    const [currentDate, setCurrentDate] = useState<Date>(cell.date);
    const [calendarCell, setCalendarCell] = useState<CalendarCell>(cell)
    const [workedHours, setWorkedHours] = useState<SchedulerWorkedHour[]>()
    const [colors, setColors] = useState<string[]>([])
    const [rows, setRows] = useState<number>(0)

    const [isFormHidden, setIsFormHidden] = useState<SchedulerWorkPlan | null>(null);

    const defaultRowsCount = 6;

    useEffect(() => {

        const wp: SchedulerWorkedHour[] = [];
        for (const c of calendarCell.workPlans) {
            if (c.workPlans.length)
                wp.push({
                    userId: c.userId,
                    workPlans: c.workPlans.map(p => {
                        return {
                            id: p.id,
                            startTime: p.startTime,
                            endTime: p.endTime,
                            totalTime: GetFormattedTimeDifference(p.startTime, p.endTime),
                            date: p.date,
                            user: `${p.firstName} ${p.lastName}`,
                            userId: p.userId
                        }
                    })

                });
        }
        setWorkedHours(sortByCurrentUser(wp))
        setColors([...colors, ...generateColors(colors.length, calendarCell.workPlans.length-colors.length)])
    }, [calendarCell])

    useEffect(() => {
        setCalendarCell(createCalendarCell(currentDate, calendar.events.currentMonth, calendar.workPlans.currentMonth))
    }, [calendar.workPlans])

    useEffect(() => {
        if (calendarCell.date != currentDate)
            currentDate.getMonth() == new Date().getMonth()
                ? setCalendarCell(createCalendarCell(currentDate, calendar.events.currentMonth, calendar.workPlans.currentMonth))
                : currentDate.getMonth() > new Date().getMonth()
                    ? setCalendarCell(createCalendarCell(currentDate, calendar.events.nextMonth, calendar.workPlans.nextMonth))
                    : setCalendarCell(createCalendarCell(currentDate, calendar.events.previousMonth, calendar.workPlans.previousMonth))
    }, [currentDate])

    const handleDayButton = (date: Date) => {
        setCurrentDate(date);
    }

    const sortByCurrentUser = (wp: SchedulerWorkedHour[]) => {
        const firstElement = wp.findIndex(w => w.userId == user!.id)

        if (firstElement !== -1) {
            const elementToMove = wp.splice(firstElement, 1)[0];
            wp.splice(0, 0, elementToMove);
        }
        return wp
    }

    const handleBackButton = () => {
        dispatch(userFiltersToDefault())
        dispatch(resetUsersWorkPlans(user!.id))
        back(currentDate)
    }
    
    return (
        <div className="component-wrapper">
            <SchedulerModal isHidden={isFormHidden} setIsHidden={setIsFormHidden} />

            <div className="working-hours__wrapper">
                <div className="calendar-header__wrapper">
                    <div className="calendar-date__wrapper">
                        <button onClick={handleBackButton} id='return-button' />
                        <CurrentDateElement date={currentDate} showFullDate={true} />
                    </div>
                    <div className="calendar-actions">
                        <div>
                            <button onClick={() => { handleDayButton(substractDay(currentDate)) }}></button>
                            <button onClick={() => { handleDayButton(addDay(currentDate)) }}></button>
                        </div>
                    </div>
                </div>
                <div className="working-hours__table">
                    <div className="working-hours__schedule">
                        {hours.map((time, index) => (
                            <div key={index}><span>{time}</span></div>
                        ))}
                    </div>

                    {!workedHours ? (
                        <div className="no-data__message-wrapper"><H4 value="No data available" /></div>
                    ) : (
                        <div
                            className="working-hours__content">
                            {workedHours.map((wh, index) => {
                                if (!wh.workPlans.length)
                                    return
                                return (
                                    <TimeRow workedHour={wh} color={colors[index]} onClick={setIsFormHidden} key={index}/>
                                )
                            })}
                            {rows < defaultRowsCount &&
                                Array.from({ length: defaultRowsCount - rows }, (_, index) => (
                                    <div className="content-row" key={index}></div>
                                ))}
                        </div>)}
                </div>
            </div>
            <div className="side-form-wrapper">
                <div className="user-search-form">
                    <UsersTableSmall />
                </div>
            </div>
        </div>

    );
};
