import { Loader } from "@components/UI";
import "./Tracker.css"
import TimeTracker from "@components/Trackers/TimeTracker";
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks";
import { fetchWorkedHours } from "@redux/slices";
import { useEffect } from 'react';

export const Tracker = () => {
    const dispatch = useAppDispatch();
    const { user } = useTypedSelector(state => state.auth);
    const { loading, workedHours } = useTypedSelector(state => state.workedHours)

    useEffect(() => {
        dispatch(fetchWorkedHours(user!.id))
    }, [])

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
            </div>
        </div >
    );
};