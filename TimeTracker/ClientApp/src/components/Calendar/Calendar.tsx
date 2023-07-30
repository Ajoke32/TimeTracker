import React, {useEffect, useState} from 'react';
import './Calendar.css'
import '../UI/Modals/CreateEventModal.css'
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {fetchEvents} from "@redux/slices/calendarEventSlice.ts";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";
import {getMothDays, monthsMap} from "../../utils/calendarHelpers.ts";
import CreateEventForm from "@components/Calendar/CreateEventForm.tsx";
import EventsWindow from "@components/Calendar/EventsWindow.tsx";
import CalendarNav from "@components/Calendar/CalendarNav.tsx";
import CalendarBody from "@components/Calendar/CalendarBody.tsx";



export interface DayOfMoth {
    day: number,
    isCurrentMoth: boolean,
    month?: number,
    haveEvents?: boolean,
    year?: number
}

const Calendar = () => {
    const dispatch = useAppDispatch();
    const {events, loading, fetched} = useTypedSelector(s => s.calendarEvent);
    const [date, setDate] = useState<Date>(new Date());
    const [arr, setArr] = useState<DayOfMoth[]>([]);
    const [month, setMonth] = useState<number>(date.getMonth())
    const [year, setYear] = useState<number>(date.getFullYear());
    const [dayEvents,setEvents] = useState<CalendarEvent[]>([]);
    const day = date.getDate();
    const [clikedDate, setCliked] = useState<number>(day);
    const [strMoth, setStrMoth] = useState<string>(monthsMap[date.getMonth()]);
    const [daysUpdated,setDaysUpdated] = useState<boolean>(false);

    useEffect(() => {
        if (!fetched) {
            dispatch(fetchEvents());
        } else {
            updateCalendar();
            updateEventsWindow(day)
        }
    }, [fetched]);

    useEffect(() => {
        updateDateItems(date.getMonth(), date.getFullYear(), true);
    }, [date]);

    useEffect(() => {
        if(daysUpdated) {
            updateCalendar();
            setDaysUpdated(false);
        }
    }, [daysUpdated]);

    function updateEventsWindow(day:number) {
        const d = new Date(year,month,day);
        const strEvents:CalendarEvent[] = [];
        events.forEach(e=>{
            const d2 = new Date(e.dateOnly);
            if(d2.getTime()===d.getTime()){
                strEvents.push(e);
            }
        });
        setEvents([...strEvents]);
    }

    function updateCalendar(){
        const eventsMap = new Map();
        events.forEach((e) => {
            const key = new Date(e.dateOnly).getTime();
            eventsMap.set(key, true);
        });
        const updated= arr.map((i) => {
            const key = new Date(i.year!, i.month!, i.day).getTime();
            i.haveEvents = eventsMap.get(key) || null;
            return i;
        });
        setArr([...updated])
    }

    function removeDayEvent(eventId:number){
        const upd=dayEvents.filter(e=>e.id!==eventId);
        setEvents([...upd]);
        updateCalendar();
    }

    function fillDaysArray(year: number, month: number) {
        setArr([...getMothDays(year, month)]);
        setDaysUpdated(true);
    }

    function onMonthChanged(e: React.MouseEvent<HTMLButtonElement>) {
        const compMonth = e.currentTarget.id === 'next' ? month + 1 : month - 1;
        if (compMonth > 11 || compMonth < 0) {
            setDate(new Date(year, compMonth));
            return;
        }
        updateDateItems(compMonth, year);
    }

    function updateDateItems(month: number, year: number, isNewYear?: boolean) {
        setMonth(month);
        setStrMoth(monthsMap[month]);
        fillDaysArray(year, month);
        if (isNewYear) {
            setYear(year)
        }
    }

    function onCreated(data: CalendarEvent) {
        const calendarDay = arr.find(e => {
            const d = new Date(e.year!, e.month!, e.day);
            const d2 = new Date(data.dateOnly);
            return d.getTime() === d2.getTime();
        });
        if (calendarDay) {
            setEvents([...dayEvents,data]);
            updateCalendar();
        }
    }

    function handleDayClick(day: number) {
        setCliked(day);
        updateEventsWindow(day);
    }

    return (
        <div className="calendar-wrapper-inner">
            <div className="calendar">
                <CalendarNav monthChanged={onMonthChanged} day={day} month={strMoth} year={year} />
                <div className="days-of-week">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <CalendarBody selectedDay={clikedDate} days={arr} handleDayClick={handleDayClick} currentDay={day} />
            </div>

            <EventsWindow updateDayEvents={removeDayEvent} events={dayEvents} />
            <CreateEventForm created={onCreated} date={new Date(year,month,clikedDate)} />
        </div>
    );
};

export default Calendar;
