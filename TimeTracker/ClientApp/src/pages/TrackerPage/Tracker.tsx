import "./Tracker.css"
import TimeTracker from "@components/Trackers/TimeTracker";

export const Tracker = () => {

    return (
        <div style={{ marginTop: '50px' }}>

            <div className='tracker-page-wrapper'>
                <TimeTracker />
                <div className="trackers-separator__wrapper">
                    <hr className="horizontal-line " />
                </div>
            </div>
        </div>
    );
};