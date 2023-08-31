import { Loader } from "@components/UI";
import "./Tracker.css"
import { TimeTracker } from "@components/Trackers";
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import { fetchWorkedHours, fetchWorkedHoursStatistic, setWorkedHourSkip, setWorkedHoursTake } from "@redux/slices";
import React, { useEffect } from 'react';
import Pager from "@components/Paging/Pager.tsx";
import { GetFormattedDateString, GetOneMonthDateRange } from "../../utils";

export const Tracker = () => {

    return (
        <div style={{ marginTop: '20px' }}>
            <div className='tracker-page-wrapper'>
                <TimeTracker />
            </div>
        </div >
    );
};