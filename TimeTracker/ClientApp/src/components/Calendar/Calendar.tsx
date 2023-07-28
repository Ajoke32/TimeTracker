import React, {useEffect, useState} from 'react';
import './Calendar.css'
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {fetchEvents} from "@redux/slices/calendarEventSlice.ts";
import CreateEventModal from "@components/UI/Modals/CreateEventModal.tsx";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";



export interface DayOfMoth{
    day:number,
    isCurrentMoth:boolean,
    month?:number,
    event?:string[],
    year?:number
}

const Calendar = () => {
    const dispatch = useAppDispatch();
    const {events,loading,fetched} = useTypedSelector(s=>s.calendarEvent);
    const [date,setDate] = useState<Date>(new Date());
    const [arr, setArr] = useState<DayOfMoth[]>([]);
    const [month,setMonth] = useState<number>(date.getMonth())
    const [year,setYear] = useState<number>(date.getFullYear());
    const [clikedDate,setCliked] = useState<number>();
    const day = date.getDate();
    const [isModalActive,setActive]  = useState<boolean>(false);
    const months:string[] = ['January','February','March','April','May','June',
        'July','August','September','October','November','December']

    const [strMoth,setStrMoth] = useState<string>(months[date.getMonth()]);

    useEffect(() => {
        if(!fetched) {
            dispatch(fetchEvents());
        }else{
            updateCalendar();
        }
    }, [fetched]);

    useEffect(() => {
        updateDateItems(date.getMonth(),date.getFullYear(),true);
    }, [date]);

    function updateCalendar() {
        const eventsMap = new Map();
        events.forEach((e) => {
            const key = new Date(e.date).getTime();
            if(eventsMap.has(key)){
                const val = eventsMap.get(key);
                eventsMap.set(key, val.concat(e.title));
            }else {
                eventsMap.set(key, [e.title]);
            }
        });
        const updated = arr.map((i) => {
            const key = new Date(i.year!, i.month!, i.day).getTime();
            i.event = eventsMap.get(key)||null;
            return i;
        });
        setArr([...updated])
    }
    function getDaysInMonth(year:number, month:number):number {
        return new Date(year, month+1, 0).getDate();
    }
    function fillDaysArray(year:number,month:number){
        const daysOfMonth = getDaysInMonth(year,month);
        const nextMonthDays = 7 * 5 - daysOfMonth;
        for (let i = 0; i < daysOfMonth; i++) {
            arr[i]= {day:i+1,isCurrentMoth:true,year:year,month:month};
        }
        for (let i=0;i<nextMonthDays;i++){
            arr[daysOfMonth+i]={day:i+1,isCurrentMoth:false};
        }
        setArr([...arr]);
    }
    function onMonthChanged(e:React.MouseEvent<HTMLButtonElement>){
        const compMonth = e.currentTarget.id==='next'?month+1:month-1;
        if(compMonth>11||compMonth<0){
            setDate(new Date(year,compMonth));
            return;
        }
        updateDateItems(compMonth,year);
        updateCalendar();
    }
    function updateDateItems(month:number,year:number,isNewYear?:boolean){
        setMonth(month);
        setStrMoth(months[month]);
        fillDaysArray(year,month);
        if(isNewYear){setYear(year)}
    }
    function onCreated(data:CalendarEvent){
        const calendarDay = arr.find(e=>{
           const d = new Date(e.year!,e.month!,e.day);
           const d2 =  new Date(data.date);
           const d3 = new Date(d2.getFullYear(),d2.getMonth(),d2.getDate());
           return d.getTime()===d3.getTime();
        });
        if(calendarDay){
            const updated = arr.map(d=>{
                if(d===calendarDay){
                    if(d.event) {
                        d.event?.push(data.title);
                    }else{
                        d.event=[data.title];
                    }
                }
                return d;
            });
            setArr([...updated]);
        }
        setActive(false);
    }
    function handleDayClick(day:number){
        setCliked(day);
        setActive(true);
    }
    function modalClose(){
        setActive(false);
    }
    return (
        <div className="calendar-wrapper-inner">
            <CreateEventModal onClose={modalClose} isActive={isModalActive} created={onCreated} date={new Date(year,month,clikedDate)} />
            <div className="calendar-nav">
                <span>{day} {strMoth} {year}</span>
                <div style={{display:'flex',gap:'5px'}}>
                <button id="prev" onClick={(e)=>onMonthChanged(e)} >&larr;</button>
                <button id="next" onClick={(e)=>onMonthChanged(e)}>&rarr;</button>
                </div>
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
                    <div onClick={()=>handleDayClick(i.day)} className={`item ${!i.isCurrentMoth?'inactive':'active'} ${(i.day===day&&i.isCurrentMoth)&&'current-day'}`} key={Math.random()}>
                        <span>{i.day}</span>
                        <div className="events-list">
                            {i?.event?.map(e=><span key={Math.random()}>{e}</span>)}
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default Calendar;
