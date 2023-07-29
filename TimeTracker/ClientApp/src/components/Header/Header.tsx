import "./Header.css"
import { ProfileAvatar } from "../UI";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import Timer from "@components/UI/Misc/Timer";
import {useEffect} from "react";
import {startTimer, stopTimer, tick} from "@redux/slices";
import { useLocation } from 'react-router-dom'

export const Header = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const timer = useTypedSelector(state => state.timer);
    const isTrackerPage = (useLocation().pathname === '/tracker');
    
    useEffect(() => {
        if (!isTrackerPage && timer.isRunning) {
            const intervalId = setInterval(() => {
                dispatch(tick());
            }, 1000);
            
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [dispatch, timer.isRunning]);

    const handleStartStopButton = () => {
        if (!timer.isRunning) {
            dispatch(startTimer());
        } else {
            dispatch(stopTimer());
        }
    };
    
    return (
        <header className="header">
            <div className="header-timer__wrapper">
                {!isTrackerPage && timer.startedAt &&  (
                    <div className="header-timer__inner">
                        <div className="header-timer__content" style={!timer.isRunning ? {opacity: '.5'} : {}}>
                            <Timer hours={timer.hours} minutes={timer.minutes} seconds={timer.seconds}/>
                        </div>
                        <button className="timer-start-stop__btn" onClick={handleStartStopButton}>
                            <div className={timer.isRunning ? "timer-stop__icon" : "timer-start__icon"}></div>
                        </button>
                    </div>
                )}
            </div>
            
            <div className="header-profile__wrapper">
                <div className="header-profile__notifications">
                    <div className="header-profile__notifications-inner">
                        <button></button>
                    </div>
                </div>

                <div className="header-profile__name">
                    <span>{`${authState.user?.firstName} ${authState.user?.lastName}`}</span>
                </div>
                <ProfileAvatar initials={`${authState.user?.firstName[0]}${authState.user?.lastName[0]}`}/>
            </div>
        </header>

    );
};