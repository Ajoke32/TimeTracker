import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {createEvent} from "@redux/slices/calendarEventSlice.ts";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";
import './CreateEventModal.css'
import {BaseButton} from "@components/UI";
interface CreateEventModalProps{
    isActive:boolean,
    created:(e:CalendarEvent)=>void,
    date:Date,
    onClose:()=>void
}

const CreateEventModal = ({isActive,created,date,onClose}:CreateEventModalProps) => {
    const dispatch = useAppDispatch();
    const {created:createdEvent} = useTypedSelector(s=>s.calendarEvent);
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
        <div style={{display:isActive?"flex":"none"}} className="create-event-modal">
            <input value={title} className="input-default input-base" type="text" placeholder="Title" onChange={(e)=>handleTitleInput(e)}/>
            <textarea value={desc} className="input-default text-area-base" placeholder="Description" onChange={(e)=>handleDescInput(e)}></textarea>
            <div className="btn-group w-100">
                <BaseButton classes={"w-100"} disabled={false} onClick={onClose} btnStyle={'decline'} text={"Discard"}/>
                <BaseButton classes={"w-100"} disabled={false}  onClick={handleCreate} btnStyle={'confirm'} text={"Add"}/>
            </div>
        </div>
    );
};

export default CreateEventModal;
