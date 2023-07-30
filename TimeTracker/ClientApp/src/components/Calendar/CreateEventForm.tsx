import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {createEvent} from "@redux/slices/calendarEventSlice.ts";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";

interface CreateEventProps{
    date:Date,
    created:(e:CalendarEvent)=>void
}
const CreateEventForm = ({created,date}:CreateEventProps) => {

    const dispatch = useAppDispatch();
    const {created:createdEvent,events} = useTypedSelector(s=>s.calendarEvent);
    const [title,setTitle] = useState<string>("");
    const [desc,setDesc] = useState<string>("");

    useEffect(() => {
        if(createdEvent){
            created(createdEvent);
        }
    }, [createdEvent]);

    function handleCreate() {
        dispatch(createEvent({title:title,description:desc,date:date}));
        setTitle("");
        setDesc("");
    }
    function handleTitleInput(e:ChangeEvent<HTMLInputElement>){
        setTitle(e.target.value);
    }

    function handleDescInput(e:ChangeEvent<HTMLTextAreaElement>){
        setDesc(e.target.value);
    }
    return (
        <div className="undef">
            <input onChange={handleTitleInput} value={title} placeholder="Title" className="input-base calendar-input" type="text"/>
            <textarea onChange={handleDescInput} value={desc} placeholder="Description" className="calendar-input" ></textarea>
            <button onClick={handleCreate} className="btn-base btn-confirm">Push event</button>
        </div>
    );
};

export default CreateEventForm;
