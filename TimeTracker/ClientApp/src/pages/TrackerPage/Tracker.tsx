import React, {useState} from 'react';
import {TimerTracker} from "@components/Trackers/TimerTracker";
import {SetHoursTracker} from "@components/Trackers/SetHoursTracker";
import "./Tracker.css"

export const Tracker = () => {
    const [switchAction, setSwitchAction] = useState<boolean>(false);
    const handleSwitchActionButton = () => {
        setSwitchAction(!switchAction);
    }
    
    return (
        <div className="tracker-wrapper">
            {!switchAction ? (
                <TimerTracker/>
            ) : (
                <SetHoursTracker/>
            )}
            <div className="tracker-actions__wrapper">
                <div>
                    <button onClick={handleSwitchActionButton} style={!switchAction ? {opacity: '1'} : {}} disabled={!switchAction}></button>
                    <button onClick={handleSwitchActionButton} style={switchAction ? {opacity: '1'} : {}} disabled={switchAction}></button>
                </div>
            </div>
        </div>
    );
};