import React, {useEffect, useState} from 'react';
import {SmallButton} from "@components/UI";
import {useTypedSelector} from "@hooks/customHooks";
import {setStartTime, setEndTime, setTotalWorkTime} from "@redux/slices";
import {useDispatch} from "react-redux";
import CurrentDateElement from "@components/UI/Misc/CurrentDateElement";

export const TrackerSetHours = () => {
    const dispatch = useDispatch();
    const hours = useTypedSelector((state) => state.workingHours);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    
    const handleShowDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }
    
    const handleCurrentTimeChange = (event: any) => {
        dispatch(setStartTime(event.target.value))
    }

    const handleNewTimeChange = (event: any) => {
        dispatch(setEndTime(event.target.value))
    }

    const handleAddHoursButton = () => {
        dispatch(setTotalWorkTime());
    }
    
    return (
        <div className="tracker-inner">
            <CurrentDateElement date={new Date()}/>
            <div className="set-hours-tracker">
                <div className="time-range__wrapper">
                    <div className="time-range__inner">
                        <input
                            type="time"
                            value={hours.startTime}
                            onChange={handleCurrentTimeChange}
                            className="time-input"
                        />
                    </div>
                    <div className="time-range__separator">
                        <span>-</span>
                    </div>
                    <div className="time-range__inner">
                        <input
                            type="time"
                            value={hours.endTime}
                            className="time-input"
                            onChange={handleNewTimeChange}
                        />
                    </div>
                </div>

                <div className="time-range__date-wrapper">
                    <button onClick={handleShowDatePicker}>
                        <input
                            type="date"
                            className="date-picker__input"
                            style={!showDatePicker ? {display: 'none'} : {}}/>
                    </button>
                </div>

                <div className="tracker-btn__wrapper">
                    <SmallButton type="button" value="Add" handleClick={handleAddHoursButton}/>
                </div>
            </div>
        </div>
    );
};