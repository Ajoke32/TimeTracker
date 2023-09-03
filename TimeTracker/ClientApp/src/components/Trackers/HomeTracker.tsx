import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "@hooks/customHooks.ts";
import {resetTimer, startTimer, tick} from "@redux/slices";
import {WorkedTime} from "@redux/types";
import {GetFormattedTimeString, GetFormattedUTCDateString} from "../../utils";
import {Timer} from "@components/UI";
import playImg from "../../assets/images/play.png";
import stopImg from "../../assets/images/stop-button.png";
import ProgressCircle from "@components/Graphics/ProgressCircle.tsx";
import moment from "moment";

const HomeTracker = () => {

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
            dispatch(startTimer());
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
            date: moment(GetFormattedUTCDateString(stopDate)).format("YYYY-MM-DDThh:mm:ss"),
            startTime: GetFormattedTimeString(startTime),
            endTime: GetFormattedTimeString(endTime)
        }));

    }


    return (
        <div className={"vacation-wrapper tracker"}>
            <Timer
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
            <div className={"play-img-wrapper"} onClick={isRunning?handleStopButton:handleStartButton}>
                {isRunning?<img src={stopImg} alt="play"/>:<img style={{left:"2px"}} src={playImg} alt="play"/>}
            </div>
        </div>
    );
};

export default HomeTracker;
