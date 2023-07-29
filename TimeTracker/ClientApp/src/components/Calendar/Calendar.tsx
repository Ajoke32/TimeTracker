import React, {useEffect, useState} from 'react';
import './Calendar.css'
import '../UI/Modals/CreateEventModal.css'
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {fetchEvents} from "@redux/slices/calendarEventSlice.ts";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";
import {getMothDays, monthsMap} from "../../utils/calendarHelpers.ts";
import CreateEventForm from "@components/CreateEventForm.tsx";



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
    const [dayEvents,setEvents] = useState<string[]>([]);
    const day = date.getDate();
    const [clikedDate, setCliked] = useState<number>(day);
    const [strMoth, setStrMoth] = useState<string>(monthsMap[date.getMonth()]);

    useEffect(() => {
        if (!fetched) {
            dispatch(fetchEvents());
        } else {
            updateEvents(month,year,day);
            updateCalendar();
        }
    }, [fetched]);

    useEffect(() => {
        updateDateItems(date.getMonth(), date.getFullYear(), true);
    }, [date]);

    function updateEvents(month:number,year:number,day:number) {

        const d = new Date(year!,month!,day);
        const strEvents:string[] = [];
        events.forEach(e=>{
            const d2 = new Date(e.date);
            const d3 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
            if(d3.getTime()===d.getTime()){
                strEvents.push(e.title);
            }
        });
        setEvents([...strEvents]);
    }

    function updateCalendar(){
        const eventsMap = new Map();
        events.forEach((e) => {
            const key = new Date(e.date).getTime();
            eventsMap.set(key, true);
        });
        const updated = arr.map((i) => {
            const key = new Date(i.year!, i.month!, i.day).getTime();
            i.haveEvents = eventsMap.get(key) || null;
            return i;
        });
        setArr([...updated])
    }

    function fillDaysArray(year: number, month: number) {
        setArr([...getMothDays(year, month)]);
    }

    function onMonthChanged(e: React.MouseEvent<HTMLButtonElement>) {
        const compMonth = e.currentTarget.id === 'next' ? month + 1 : month - 1;
        if (compMonth > 11 || compMonth < 0) {
            setDate(new Date(year, compMonth));
            return;
        }
        updateDateItems(compMonth, year);
        updateEvents(compMonth,year,day);
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
            const d2 = new Date(data.date);
            const d3 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
            return d.getTime() === d3.getTime();
        });
        if (calendarDay) {
            setEvents([...dayEvents,data.title]);
            updateCalendar();
        }
    }

    function handleDayClick(day: number) {
        setCliked(day);
        updateEvents(month,year,day);
    }

    return (
        <div className="calendar-wrapper-inner">

            <div className="calendar">
                <div className="calendar-nav">
                    <button id="prev" className="arrow" onClick={(e) => onMonthChanged(e)}>&larr;</button>
                    <span>{day} {strMoth} {year}</span>
                    <button id="next" className="arrow" onClick={(e) => onMonthChanged(e)}>&rarr;</button>
                </div>
                <div className="days-of-week">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className="calendar-wrapper">
                    {arr.map(i =>
                        <div onClick={() => handleDayClick(i.day)}
                             className={`item ${i.haveEvents&&'event-mark'} ${!i.isCurrentMoth ? 'inactive' : 'active'} ${(i.day === day && i.isCurrentMoth) && 'current-day'}`}
                             key={Math.random()}>
                            <span style={{color:`${!i.isCurrentMoth&&'#adb5bd'}`}}>{i.day}</span>
                        </div>)}
                </div>
            </div>


            <div className="day-events">
                <div className="inner-events">
                    <h2 style={{paddingTop:"10px"}}>Today events</h2>
                    {dayEvents.map(i=>
                        <div key={Math.random()} className="event">
                            <span>{i}</span>
                            {/*<div className="btn-group">
                                <button className="btn-base btn-info">Edit</button>
                                <button className="btn-base btn-decline">Delete</button>
                            </div>*/}
                        </div>)}
                </div>
            </div>
            <CreateEventForm created={onCreated} date={new Date(year,month,clikedDate)} />
        </div>
    );
};

export default Calendar;
