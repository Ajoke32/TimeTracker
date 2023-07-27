import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {startTimer, resetTimer, tick, updateTimerTime, stopTimer} from '../../redux';
import "./trackers.css";
import {SmallButton} from "../UI";
import {useTypedSelector} from "../../hooks";
import Timer from "@components/UI/Misc/Timer";
import CurrentDateElement from "@components/UI/Misc/CurrentDateElement";

export const TrackerTimer = () => {
    const dispatch = useDispatch();
    const timer = useTypedSelector((state) => state.timer);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer.isRunning)
                dispatch(tick());
        }, 1000);

        if (timer.isRunning)
            dispatch(updateTimerTime());
        
        return () => {
            clearInterval(intervalId);
        }
    }, [dispatch, timer.isRunning]);

    const handleStartStopButton = () => {
        if (!timer.isRunning) {
            dispatch(startTimer());
        } else {
            dispatch(stopTimer());
        }
    };
    
    const handleStopButton = () => {
        dispatch(resetTimer());
        window.location.reload();
    }
    
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
                                <SmallButton type="button" value={timer.isRunning ? "Pause" : "Start"} handleClick={handleStartStopButton} />
                                <SmallButton type="button" value="Stop" handleClick={handleStopButton}/>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};