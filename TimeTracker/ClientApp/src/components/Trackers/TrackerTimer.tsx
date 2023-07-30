import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, resetTimer, tick, stopTimer } from '../../redux';
import "./trackers.css";
import { SmallButton, CurrentDateElement, Timer } from "@components/UI";
import { useTypedSelector } from "@hooks/customHooks";
import { GetFormattedDateString, GetFormattedTimeString, GetTimeFromString } from '../../utils/dateTimeHelpers';
import { WorkedHour } from '@redux/types';

export const TrackerTimer = ({ workedHour }: { workedHour?: WorkedHour }) => {
    
    if (workedHour) {
        const time = GetTimeFromString(workedHour.workedTime);

        return (
            <>
                <CurrentDateElement date={new Date(workedHour.date)} />
                <div className="tracker-content__wrapper">
                    <div className="tracker-content__inner">
                        <div className="timer-tracker">
                            <Timer hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const dispatch = useDispatch();

    const { hours, minutes, seconds, isRunning } = useTypedSelector((state) => state.timer);
    const { user } = useTypedSelector(state => state.auth)

    useEffect(() => {
        if (isRunning) {
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
            dispatch(stopTimer());
        }
    };

    const handleStopButton = () => {
        dispatch(resetTimer({
            userId: user!.id,
            date: GetFormattedDateString(new Date()),
            workedTime: GetFormattedTimeString({ hours, minutes, seconds })
        }));
    }

    return (
        <>
            <CurrentDateElement date={new Date()} />
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
                        <SmallButton type="button" value="Stop" handleClick={handleStopButton} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};