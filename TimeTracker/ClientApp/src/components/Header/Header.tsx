import "./Header.css"
import { ProfileAvatar, Timer } from "@components/UI";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { useEffect } from "react";
import {startTimer, resetTimer, tick, fetchWorkedHoursStatisticFail, fetchWorkedHoursStatistic} from "@redux/slices";
import { useLocation } from 'react-router-dom'
import { WorkedTime } from "@redux/types";
import { GetFormattedUTCDateString, GetFormattedTimeString } from "../../utils";

export const Header = () => {
    const dispatch = useAppDispatch();
    const { user } = useTypedSelector(state => state.auth);
    const { isRunning, startedAt, hours, minutes, seconds } = useTypedSelector(state => state.timer);
    const isTrackerPage = (useLocation().pathname === '/tracker');
    const {hoursToWork} = useTypedSelector(s=>s.workedHours);
    useEffect(() => {
        if (!isTrackerPage && isRunning) {
            const intervalId = setInterval(() => {
                dispatch(tick());
            }, 1000);

            return () => {
                clearInterval(intervalId);
            }
        }
    }, [dispatch, isRunning]);

    const handleStartStopButton = () => {
        if (!isRunning) {
            dispatch(startTimer());
        } else {
            const startDate = new Date(startedAt!);
            const stopDate = new Date();

            const startTime: WorkedTime = {
                hours: startDate.getUTCHours(),
                minutes: startDate.getUTCMinutes(),
                seconds: startDate.getUTCSeconds()
            }

            const endTime: WorkedTime = {
                hours: stopDate.getUTCHours(),
                minutes: stopDate.getUTCMinutes(),
                seconds: stopDate.getUTCSeconds()
            }

            dispatch(resetTimer({
                userId: user!.id,
                date: GetFormattedUTCDateString(stopDate),
                startTime: GetFormattedTimeString(startTime),
                endTime: GetFormattedTimeString(endTime)
            }));
        }
    };

    return (
        <header className="header">
            <div className="header-timer__wrapper">
                {!isTrackerPage && startedAt && (
                    <div className="header-timer__inner">
                        <div className="header-timer__content" style={!isRunning ? { opacity: '.5' } : {}}>
                            <Timer hours={hours} minutes={minutes} seconds={seconds} />
                        </div>
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
                    <span>{`${user?.firstName} ${user?.lastName}`}</span>
                </div>
                <ProfileAvatar initials={`${user?.firstName[0]}${user?.lastName[0]}`} />
            </div>
        </header>

    );
};