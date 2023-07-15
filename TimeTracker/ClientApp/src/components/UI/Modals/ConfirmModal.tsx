import React from 'react';
import "./modals.css"
import {SmallButton} from "../Buttons";

interface ConfirmModalProps {
    title: string,
    description: string,
    onConfirm: () => void
    onCancel: () => void,
}

export const ConfirmModal = ({title="WARNING", description, onConfirm, onCancel} : ConfirmModalProps) => {

    return (
        <div>
            <div className="confirm-modal__wrapper">
                <div className="confirm-modal__content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className="confirm-modal__btn-wrapper">
                        <SmallButton type="submit" value="YES" onClick={onConfirm}/>
                        <SmallButton type="submit" value="Cancel" onClick={onCancel}/>
                    </div>
                </div>
            </div>
        </div>
    );
};