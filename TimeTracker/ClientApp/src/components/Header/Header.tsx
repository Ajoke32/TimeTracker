import "./Header.css"
import { ProfileAvatar } from "../UI";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import Timer from "@components/UI/Misc/Timer";
import {useEffect} from "react";
import {refreshTimer, startTimer, tick, updateTimerTime} from "@redux/slices";

export const Header = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const timer = useTypedSelector(state => state.timer)

    useEffect(() => {
        const timerStateString = localStorage.getItem('timer');
        if (timerStateString) {
            const timerState = JSON.parse(timerStateString);
            dispatch(refreshTimer(timerState));
            dispatch(startTimer());
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
    
    
    return (
        <header className="header" style={timer.isRunning ? {justifyContent: 'space-between'}: {justifyContent: 'flex-end'}}>
            {timer.isRunning ? (
                <Timer hours={timer?.hours} minutes={timer?.minutes} seconds={timer?.seconds}/>
            ) : (<div style={{display: 'none'}}></div>)}
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