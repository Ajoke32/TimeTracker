import React, { useState } from 'react';
import { TrackerTimer } from "@components/Trackers/TrackerTimer";
import { TrackerSetHours } from "@components/Trackers/TrackerSetHours";
import { WorkedHour } from '@redux/types';

export const TimeTracker = ({ workedHour }: { workedHour?: WorkedHour }) => {
    const [switchAction, setSwitchAction] = useState<boolean>(true);

    const handleSwitchActionButton = () => {
        setSwitchAction(!switchAction);
    }


    return (
        <div className="tracker-wrapper">
            {/* <div className="tracker-inner">
                {switchAction ? (
                    <TrackerTimer workedHour={workedHour} />
                ) : (
                    <TrackerSetHours workedHour={workedHour} />
                )}
            </div>
            <div className="tracker-actions__wrapper">
                <div>
                    <button onClick={handleSwitchActionButton} style={switchAction ? { opacity: '1' } : {}} disabled={switchAction}></button>
                    <button onClick={handleSwitchActionButton} style={!switchAction ? { opacity: '1' } : {}} disabled={!switchAction}></button>
                </div>
            </div> */}
        </div>
    );
};