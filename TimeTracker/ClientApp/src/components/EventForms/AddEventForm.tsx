import React, {ChangeEvent, useState} from 'react';
import {useForm} from "react-hook-form";
import {Inputs} from "@components/EventForms";
import {LargeButton, TextInput} from "@components/UI";
import "./eventForms.css"
import CurrentDateElement from "@components/UI/Misc/CurrentDateElement";

const AddEventForm = () => {
    const [showDateMenu, setShowDateMenu] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    
    const { register, handleSubmit, setValue,
        formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            description: '',
            eventDate: new Date(),
        }
    });
    
    const handleShowDateMenu = () => {
        setShowDateMenu(!showDateMenu);
    }
    
    const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value)
        setCurrentDate(newDate);
        setShowDateMenu(!showDateMenu);
    }
    
    return (
        <div className="event-form__inner">
            <form>
                <span>Add event for</span>
                <div className="event-date-wrapper">
                    <CurrentDateElement date={currentDate} showFullDate={true}/>
                    <button  type="button" onClick={handleShowDateMenu} className="show-datepicker__btn">
                        <input
                            type="date"
                            className="date-picker__input"
                            onChange={handleChangeDate}
                            style={showDateMenu ? {display: 'none'} : {}}
                        />
                    </button>
                </div>
                
                <TextInput name="title" placeholder="Title"/>
                
                <TextInput name="description" placeholder="Description (optional)"/>
                
                
                <LargeButton type="submit" value="Add event"/>
            </form>
        </div>
    );
};

export default AddEventForm;