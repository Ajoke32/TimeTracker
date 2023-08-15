import { Loader } from "@components/UI";
import "./Tracker.css"
import TimeTracker from "@components/Trackers/TimeTracker";
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import {fetchWorkedHours, setWorkedHourSkip, setWorkedHoursTake} from "@redux/slices";
import React, { useEffect } from 'react';
import Pager from "@components/Paging/Pager.tsx";

export const Tracker = () => {
    const dispatch = useAppDispatch();
    const { user } = useTypedSelector(state => state.auth);
    const { loading, workedHours,
        take,skip,extensions,perPage } = useTypedSelector(state => state.workedHours)

    useEffect(() => {
        dispatch(fetchWorkedHours({
            userId:user!.id,
            take:take,
            skip:skip
        }))
    }, [take,skip])

    return (
        <div style={{ marginTop: '20px' }}>
            <div className='tracker-page-wrapper'>
                <TimeTracker />
                <div className="trackers-separator__wrapper">
                    <hr className="horizontal-line " />
                </div>
                {loading
                    ?
                    <div className="loader-wrapper">
                        <Loader />
                    </div>
                    : workedHours.map((wh) => (
                        <TimeTracker workedHour={wh} key={wh.id} />
                    ))
                }
                {extensions?.count!>perPage&&
                    <Pager take={take} skip={skip} perPage={perPage} setTake={setWorkedHoursTake}
                           setSkip={setWorkedHourSkip} extensions={{count:extensions?.count!}} />}
            </div>
        </div >
    );
};