import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, resetTimer, tick, updateTimerTime, refreshTimer } from '../../redux';
import "./trackers.css";
import {SmallButton} from "../UI";
import {useTypedSelector} from "../../hooks";
import Timer from "@components/UI/Misc/Timer";
import CurrentDateElement from "@components/UI/Misc/CurrentDateElement";

export const TrackerTimer = () => {
    const dispatch = useDispatch();
    const timer = useTypedSelector((state) => state.timer);
    
    useEffect(() => {
        const timerStateString = localStorage.getItem('timer');
        if (timerStateString) {
            const timerState = JSON.parse(timerStateString);
            dispatch(refreshTimer(timerState));
        }
        
        const intervalId = setInterval(() => {
            if (timer.isRunning)
                dispatch(tick());
        }, 1000);

        if (timer.isRunning) {
            dispatch(updateTimerTime(new Date()));
        }
        
        return () => {
            clearInterval(intervalId);
        }
    }, [timer.isRunning, dispatch, timer]);

    const handleStartStopButton = () => {
        if (!timer.isRunning) {
            dispatch(startTimer());
        } else {
            dispatch(resetTimer());
            localStorage.removeItem("timer")
        }
    };
    
    return (
        <div className="tracker-inner">
            <CurrentDateElement date={new Date()}/>

            <div className="tracker-content__wrapper">
                <div className="tracker-content__inner">
                        <div className="timer-tracker">
                            <Timer 
                                hours={timer.hours} 
                                minutes={timer.minutes} 
                                seconds={timer.seconds}
                            />
                            <div className="tracker-btn__wrapper">
                                <SmallButton type="button" value={timer.isRunning ? "Stop" : "Start"} handleClick={handleStartStopButton} />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};