import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {startTimer, resetTimer, tick, stopTimer} from '../../redux';
import "./trackers.css";
import {SmallButton} from "../UI";
import {useTypedSelector} from "../../hooks";
import Timer from "@components/UI/Misc/Timer";
import CurrentDateElement from "@components/UI/Misc/CurrentDateElement";

export const TrackerTimer = () => {
    const dispatch = useDispatch();

    const {hours, minutes, seconds, isRunning} = useTypedSelector((state) => state.timer);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(tick());
        }, 1000);
        
        return () => {
            clearInterval(intervalId);
        }
    }, [dispatch]);

    const handleStartStopButton = () => {
        if (!isRunning) {
            dispatch(startTimer());
        } else {
            dispatch(stopTimer());
        }
    };
    
    const handleStopButton = () => {
        dispatch(resetTimer());
    }
    
    return (
        <div className="tracker-inner">
            <CurrentDateElement date={new Date()}/>
            <div className="tracker-content__wrapper">
                <div className="tracker-content__inner">
                        <div className="timer-tracker">
                            <Timer 
                                hours={hours} 
                                minutes={minutes} 
                                seconds={seconds}
                            />
                            <div className="tracker-btn__wrapper">
                                <SmallButton type="button" value={isRunning ? "Pause" : "Start"} handleClick={handleStartStopButton} />
                                <SmallButton type="button" value="Stop" handleClick={handleStopButton}/>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};