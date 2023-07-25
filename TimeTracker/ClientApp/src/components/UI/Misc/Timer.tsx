import React from 'react';
import "./misc.css"

interface TimerProps {
    hours: string | number,
    minutes: string | number,
    seconds: string | number,
}

const Timer = ({hours, minutes, seconds} : TimerProps) => {
    return (
        <div className="timer-wrapper">
            <span>{hours}</span>
            <span>{minutes}</span>
            <span>{seconds}</span>
        </div>
    );
};

export default Timer;