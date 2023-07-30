import React from 'react';
import editImg from "../../assets/images/edit_user_icon.png";
import removeImg from "../../assets/images/remove.png";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";



interface EventWindowProps{
    events:CalendarEvent[]
}

const EventsWindow = ({events}:EventWindowProps) => {

    function handleDelete(id:number){

    }

    function handleEdit(){

    }

    return (
        <div className="day-events">
            <div className="inner-events">
                <h2 style={{paddingTop:"10px"}}>Today events</h2>
                {events.map(i=>
                    <div key={Math.random()} className="event">
                        <span className="event-txt">{i.title}</span>
                        <div style={{display:"flex",gap:"5px"}}>
                            <img onClick={handleEdit} className="event-img" src={editImg} alt="edit event"/>
                            <img onClick={()=>handleDelete(i.id)} className="event-img" src={removeImg} alt="edit event"/>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default EventsWindow;
