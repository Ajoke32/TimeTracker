import React, {ChangeEvent, useState} from 'react';
import {Vacation, VacationStateEnum} from "@redux/types";


interface CancelVacationModalProps{
    isOpen:boolean,
    onSuccess:()=>void,
    onEdit:()=>void,
    vacation:Vacation,
    setVacation:(vacation:Vacation)=>void;
}
const CancelVacationModal = ({isOpen,onSuccess,onEdit,vacation,setVacation}:CancelVacationModalProps) => {

    function handleStartDateInput(e: ChangeEvent<HTMLInputElement>){
        setVacation({...vacation,vacationState:VacationStateEnum.Edited,startDate:new Date(e.target.value)})
    }

    function handleEndDateInput(e:ChangeEvent<HTMLInputElement>){
        setVacation({...vacation,vacationState:VacationStateEnum.Edited,endDate:new Date(e.target.value)})
    }

    return (
        <div className="msg-wrapper" style={{display:`${isOpen?'flex':'none'}`}}>
            <h2 style={{justifySelf:"flex-start"}}>Maybe you want edit you vacation days</h2>
            <input onChange={(e)=>handleStartDateInput(e)} type="date"/>
            <input onChange={(e)=>handleEndDateInput(e)} type="date"/>
            <button onClick={onEdit}>Yes,save</button>
            <button onClick={onSuccess}>No,cancel it</button>
        </div>
    );
};

export default CancelVacationModal;
