import React, {useState} from 'react';
import "./Tracker.css"
import TimeTracker from "@components/Trackers/TimeTracker";

export const Tracker = () => {
    
    return (
        <div style={{marginTop: '50px'}}>
            <TimeTracker/>
        </div>
    );
};