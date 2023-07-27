import "./Header.css"
import { ProfileAvatar } from "../UI";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import Timer from "@components/UI/Misc/Timer";
import {useEffect} from "react";
import {tick, updateTimerTime} from "@redux/slices";
import { useLocation } from 'react-router-dom'

export const Header = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const timer = useTypedSelector(state => state.timer);
    const isTrackerPage = (useLocation().pathname === '/tracker');
    
    
    
    useEffect(() => {
        if (!isTrackerPage) {
            const intervalId = setInterval(() => {
                if (timer.isRunning)
                    dispatch(tick());

                dispatch(updateTimerTime(new Date()));
            }, 1000);


            return () => {
                clearInterval(intervalId);
            }
        }
    }, [dispatch]);
    
    
    return (
        <header className="header">
            <div className="header-timer__wrapper">
                {timer.isRunning && !isTrackerPage && (
                    <Timer hours={timer.hours} minutes={timer.minutes} seconds={timer.seconds}/>
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