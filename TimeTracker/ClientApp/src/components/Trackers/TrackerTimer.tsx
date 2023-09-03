import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, resetTimer, tick} from '../../redux';
import "./trackers.css";
import { SmallButton, CurrentDateElement, Timer, WorkedHours } from "@components/UI";
import { useTypedSelector } from "@hooks/customHooks";
import { GetFormattedUTCDateString, GetFormattedTimeString, GetTimeFromString } from '../../utils';
import { WorkedHour, WorkedTime } from '@redux/types';

export const TrackerTimer = ({ workedHour }: { workedHour?: WorkedHour }) => {

    if (workedHour) {
        const time = GetTimeFromString(workedHour.totalTime);

        return (
            <>
                <CurrentDateElement date={new Date(workedHour.date)} showFullDate={true} />
                <div className="tracker-content__wrapper">
                    <div className="tracker-content__inner">
                        <div className="timer-tracker">
                            <div className="timer-tracker__wrapper worked-hours__timer">
                                <Timer hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
                            </div>
                            <WorkedHours workedHour={workedHour} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const dispatch = useDispatch();

    const { hours, minutes, seconds, isRunning, startedAt } = useTypedSelector((state) => state.timer);
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

    const handleStartButton = () => {
        if (!isRunning) {
            dispatch(startTimer(startedAt));
        }
    };

    const handleStopButton = () => {
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

    return (
        <>
            <CurrentDateElement date={new Date()} showFullDate={true}/>
            <div className="tracker-content__wrapper">
                <div className="tracker-content__inner">
                    <div className="timer-tracker">
                        <div className="timer-tracker__wrapper">
                            <Timer
                                hours={hours}
                                minutes={minutes}
                                seconds={seconds}
                            />
                        </div>
                        <div className="tracker-btn__wrapper">
                            {isRunning
                                ? <SmallButton type="button" value="Stop" handleClick={handleStopButton} />
                                : <SmallButton type="button" value="Run" handleClick={handleStartButton} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};