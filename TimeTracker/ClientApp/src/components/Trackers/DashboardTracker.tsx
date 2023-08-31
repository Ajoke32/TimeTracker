import React, { useState } from 'react';
import { TrackerTimer } from "@components/Trackers/TrackerTimer";
import { TrackerSetHours } from "@components/Trackers/TrackerSetHours";
import { WorkedHour } from '@redux/types';
import { Timer, WorkedHours } from '..';
import { GetTimeFromString } from '../../utils';
import { DashboardTrackerSetHours } from '.';

export const DashboardTracker = ({ workedHour }: { workedHour: WorkedHour }) => {
    const [switchAction, setSwitchAction] = useState<boolean>(true);
    const time = GetTimeFromString(workedHour.totalTime)

    const handleSwitchActionButton = () => {
        setSwitchAction(!switchAction);
    }
    return (
        <div className="worked-hour-row">
            <div className="tracker-inner">
                {switchAction ? (
                    <div className="tracker-content__wrapper">
                        <div className="tracker-content__inner">
                            <div className="timer-tracker">
                                <WorkedHours workedHour={workedHour} />
                                <div className="timer-tracker__wrapper worked-hours__timer">
                                    <Timer hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <DashboardTrackerSetHours workedHour={workedHour} />
                )}
            </div>
            <div className="tracker-actions__wrapper">
                <div>
                    <button onClick={handleSwitchActionButton} style={switchAction ? { opacity: '1' } : {}} disabled={switchAction}></button>
                    <button onClick={handleSwitchActionButton} style={!switchAction ? { opacity: '1' } : {}} disabled={!switchAction}></button>
                </div>
            </div>
        </div>
    );
};
