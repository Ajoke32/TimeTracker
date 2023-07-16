import React, { useState } from 'react';
import "./modals.css"

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling of background content
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto'; // Restore scrolling of background content
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Open Modal</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Modal Title</h2>
                            <p>Modal content goes here...</p>
                            <button onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;