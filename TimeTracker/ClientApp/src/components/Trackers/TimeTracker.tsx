import React, {useState} from 'react';
import {TrackerTimer} from "@components/Trackers/TrackerTimer";
import {TrackerSetHours} from "@components/Trackers/TrackerSetHours";

const TimeTracker = () => {
    const [switchAction, setSwitchAction] = useState<boolean>(false);
    const [workedTime, setWorkedTime] = useState<[]>([]);

    const handleSwitchActionButton = () => {
        setSwitchAction(!switchAction);
    } 
    
    
    return (
            <div className="tracker-wrapper">
                {!switchAction ? (
                    <TrackerTimer />
                ) : (
                    <TrackerSetHours />
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

export default TimeTracker;