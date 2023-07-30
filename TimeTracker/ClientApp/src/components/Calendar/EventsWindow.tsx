import React, {useEffect, useState} from 'react';
import editImg from "../../assets/images/edit_user_icon.png";
import removeImg from "../../assets/images/remove.png";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {deleteEvent} from "@redux/slices/calendarEventSlice.ts";
import {Loader} from "@components/UI";



interface EventWindowProps{
    events:CalendarEvent[],
    updateDayEvents:(day:number)=>void,
    loading:boolean,
    selectedDay:number
}

const EventsWindow = ({events,updateDayEvents,loading,selectedDay}:EventWindowProps) => {
    const {deleted} = useTypedSelector(s=>s.calendarEvent);
    const [deleteId,setDeleteId] = useState<number>(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(deleted){
            updateDayEvents(deleteId);
            setDeleteId(0);
        }
    }, [deleted]);

    function handleDelete(id:number){
        const conf = confirm("are you sure?");
        if(conf) {
            dispatch(deleteEvent(id));
            setDeleteId(id);
        }
    }


    return (
        <div className="day-events">
            {loading?<Loader/>:
                <div className="inner-events">
                    <h2 style={{paddingTop:"10px"}}>{selectedDay===new Date().getDate()?"Today events":`Events for ${selectedDay}`}</h2>
                    {events.map(i=>
                        <div key={Math.random()} className="event">
                            <span className="event-txt">{i.title}</span>
                            <div style={{display:"flex",gap:"5px"}}>
                                {/*<img onClick={handleEdit} className="event-img" src={editImg} alt="edit event"/>*/}
                                <img onClick={()=>handleDelete(i.id)} className="event-img" src={removeImg} alt="edit event"/>
                            </div>
                        </div>)}
                </div>
                }
        </div>
    );
};

export default EventsWindow;
