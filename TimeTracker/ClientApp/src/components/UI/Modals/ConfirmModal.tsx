import React, {useState} from 'react';
import "./modals.css"
import {SmallButton} from "../";

interface ConfirmModalProps {
    title: string,
    description: string,
    onConfirm: (value : any) => void
    value: any,
}

export const ConfirmModal = ({title, description, onConfirm, value} : ConfirmModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleConfirm = () => {
        onConfirm(value);
        handleOpenCloseModal();
    }
    
    const handleOpenCloseModal = () => {
        setIsOpen(!isOpen);
    }
    
    

    return (
        <div className="modal-wrapper">
            <button  type="button" className="modal-open-close__btn"  onClick={handleOpenCloseModal}></button>
            <div className="modal-window__wrapper" style={isOpen ? {display: 'flex'} : {display: 'none'}}>
                <div className="modal-window__content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className="modal-btn__wrapper">
                        <SmallButton type="submit" value="Yes" onClick={handleConfirm}/>
                        <SmallButton type="submit" value="Cancel" onClick={handleOpenCloseModal}/>
                    </div>
                </div>
            </div>
        </div>
    );
};