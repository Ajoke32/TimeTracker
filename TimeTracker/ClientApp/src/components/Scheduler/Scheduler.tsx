import './scheduler.css';
import "../Calendar/calendars.css"
import { useState, useEffect } from 'react';
import { CurrentDateElement } from "@components/UI";
import { H4 } from "@components/Headings";
import { CalendarType, CalendarCell } from '@redux/types';
import { useTypedSelector } from '@hooks/customHooks';
import { GetFormattedTimeDifference, createCalendarCell } from '../../utils';
import { SearchInput, UsersTable, UsersTableNavbar } from '..';
import { User } from '@redux/intrerfaces';


const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
];

const convertTimeToIndex = (time: string) => {
    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    return minutes + hours * 60;
};


/*random color from grey to light blue/cyan */
const generateRandomColor = () => {
    const randomR = Math.floor(Math.random() * 100) + 100;
    const randomG = Math.floor(Math.random() * 100) + 155;
    const randomB = Math.floor(Math.random() * 100) + 200;
    const randomOpacity = Math.random() * 0.3 + 0.3;

    return `rgba(${randomR}, ${randomG}, ${randomB}, ${randomOpacity})`;
}

const colors = [
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
]

const Scheduler = ({ data, back }: { data: { cell: CalendarCell, calendar: CalendarType }, back: (selectedDate: Date) => void }) => {
    const { cell, calendar } = data;
    const { events, workPlans } = useTypedSelector(state => state.calendar);
    const { users } = useTypedSelector(state => state.users)

    const [currentDate, setCurrentDate] = useState<Date>(cell.date);
    const [calendarCell, setCalendarCell] = useState<CalendarCell>(cell)
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const defaultRowsCount = 7;

    const workedHours = calendarCell.workPlans.map(c => {
        return {
            startTime: c.startTime,
            endTime: c.endTime,
            totalTime: GetFormattedTimeDifference(c.startTime, c.endTime),
            date: c.date,
            user: `${c.firstName} ${c.lastName}`
        }
    })

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

    const handlePrevDayButton = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);

        if (newDate.getDate() === 0) {
            newDate.setDate(0);
        }

        setCurrentDate(newDate);
    }

    const handleNextDayButton = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate.getDate() === 1) {
            newDate.setDate(1);
        }

        setCurrentDate(newDate);
    }

    const handleSearch = (searchValue: string) => {
        const filtered = users.filter(
            (user) =>
                (user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchValue.toLowerCase())) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="component-wrapper">
            <div className="working-hours__wrapper">
                <div className="calendar-header__wrapper">
                    <div className="calendar-date__wrapper">
                        <button onClick={() => { back(currentDate) }} id='return-button' />
                        <CurrentDateElement date={currentDate} showFullDate={true} />
                    </div>
                    <div className="calendar-actions">
                        <div>
                            <button onClick={handlePrevDayButton}></button>
                            <button onClick={handleNextDayButton}></button>
                        </div>
                    </div>
                </div>

                <div className="working-hours__table">
                    <div className="working-hours__schedule">
                        {hours.map((time, index) => (
                            <div key={index}><span>{time}</span></div>
                        ))}
                    </div>

                    {workedHours.length < 1 ? (
                        <div className="no-data__message-wrapper"><H4 value="No data available" /></div>
                    ) : (
                        <div
                            className="working-hours__content"
                            style={{ gridTemplateRows: `repeat(${workedHours.length < 7 ? 7 : workedHours.length}, 1fr)` }}>
                            {workedHours.map((item, index) => (
                                <div className="content-row" key={index}>
                                    {convertTimeToIndex(item.totalTime) > 15 &&
                                        <div
                                            className="working-hours__inner-row"
                                            style={{
                                                width: `${(convertTimeToIndex(item.totalTime) / (hours.length * 60)) * 100}%`,
                                                background: generateRandomColor(),
                                                left: `${((convertTimeToIndex(item.startTime) - convertTimeToIndex(hours[0])) / (hours.length * 60)) * 100}%`
                                            }}
                                        >
                                            <div className="time-range__wrapper">
                                                <span className="">{item.startTime.slice(0, -3)} - {item.endTime.slice(0, -3)}</span>
                                            </div>
                                        </div>}
                                </div>
                            ))}
                            {workedHours.length < defaultRowsCount &&
                                Array.from({ length: defaultRowsCount - workedHours.length }, (_, index) => (
                                    <div className="content-row" key={index}></div>
                                ))}
                        </div>)}
                </div>
            </div>
            <div className="side-form-wrapper">
                
                <div className="user-search-form">
                    <SearchInput name="search" placeholder="Search by name or email" onSearch={handleSearch} />
                </div>
            </div>
        </div>

    );
};

export default Scheduler;
