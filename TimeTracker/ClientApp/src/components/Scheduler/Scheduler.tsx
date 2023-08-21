import './scheduler.css';
import "../Calendar/calendars.css"
import { useState, useEffect } from 'react';
import { CurrentDateElement } from "@components/UI";
import { H4 } from "@components/Headings";
import { CalendarType, CalendarCell, SchedulerWorkedHour, SchedulerWorkPlan } from '@redux/types';
import { useTypedSelector } from '@hooks/customHooks';
import { GetFormattedTimeDifference, addDay, createCalendarCell, substractDay } from '../../utils';
import { SchedulerModal, UsersTableSmall, hours } from '..';
import { TimeRow } from './TimeRow';

const Scheduler = ({ data, back }: { data: { cell: CalendarCell, calendar: CalendarType }, back: (selectedDate: Date) => void }) => {
    const { cell, calendar } = data;

    const { events, workPlans } = useTypedSelector(state => state.calendar);
    const { user } = useTypedSelector(state => state.auth)

    const [currentDate, setCurrentDate] = useState<Date>(cell.date);
    const [calendarCell, setCalendarCell] = useState<CalendarCell>(cell)
    const [workedHours, setWorkedHours] = useState<SchedulerWorkedHour[]>()
    const [colors, setColors] = useState<string[]>([])
    const [isFormHidden, setIsFormHidden] = useState<SchedulerWorkPlan | null>(null);

    const defaultRowsCount = 7;

    useEffect(() => {
        const wp: SchedulerWorkedHour[] = calendarCell.workPlans.map(c => ({
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

        }))

        setWorkedHours(sortByCurrentUser(wp))
        setColors(generateColors())
    }, [calendarCell])

    useEffect(() => {
        setCalendarCell(createCalendarCell(currentDate, events.currentMonth, workPlans.currentMonth))
    }, [workPlans])

    useEffect(() => {
        if (calendarCell.date != currentDate)
            currentDate.getMonth() == new Date().getMonth()
                ? setCalendarCell(calendar.currentDates.find
                    (c => c.date.getDate() == currentDate.getDate())
                    ?? createCalendarCell(currentDate, events.currentMonth, workPlans.currentMonth)
                )
                : currentDate.getMonth() > new Date().getMonth()
                    ? setCalendarCell(calendar.nextDates.find
                        (c => c.date.getDate() == currentDate.getDate())
                        ?? createCalendarCell(currentDate, events.nextMonth, workPlans.nextMonth)
                    )
                    : setCalendarCell(calendar.previousDates.find
                        (c => c.date.getDate() == currentDate.getDate())
                        ?? createCalendarCell(currentDate, events.previousMonth, workPlans.previousMonth)
                    )
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

    const generateColors = () => {
        let colorsArr = colors;
        for (let i = colors!.length; i < calendarCell.workPlans.length; i++) {
            const randomR = Math.floor(Math.random() * 100) + 100;
            const randomG = Math.floor(Math.random() * 100) + 155;
            const randomB = Math.floor(Math.random() * 100) + 200;
            const randomOpacity = Math.random() * 0.3 + 0.3;

            colorsArr.push(`rgba(${randomR}, ${randomG}, ${randomB}, ${randomOpacity})`)
        }
        return colorsArr;
    }

    return (
        <div className="component-wrapper">
            <SchedulerModal isHidden={isFormHidden} setIsHidden={setIsFormHidden}/>

            <div className="working-hours__wrapper">
                <div className="calendar-header__wrapper">
                    <div className="calendar-date__wrapper">
                        <button onClick={() => { back(currentDate) }} id='return-button' />
                        <CurrentDateElement date={currentDate} showFullDate={true} additional={calendarCell.events.length > 0 ? calendarCell.events[0].title : undefined} />
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
                            className="working-hours__content"
                            style={{ gridTemplateRows: `repeat(${workedHours.length < 7 ? 7 : workedHours.length}, 1fr)` }}>
                            {workedHours.map((wh, index) => {
                                return (
                                    <TimeRow workedHour={wh} color={colors[index]} onClick={setIsFormHidden} key={index} />
                                )
                            })}
                            {workedHours.length < defaultRowsCount &&
                                Array.from({ length: defaultRowsCount - workedHours.length }, (_, index) => (
                                    <div className="content-row" key={index}></div>
                                ))}
                        </div>)}
                </div>
            </div>
            <div className="side-form-wrapper">
                <div className="user-search-form">
                    <div className='inner-wrapper'>
                        <UsersTableSmall />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Scheduler;