import { DayPlanForm } from "@components/CalendarForms";
import { SchedulerModalModalProps } from ".";

export const SchedulerModal = ({ isHidden, setIsHidden}: SchedulerModalModalProps) => {
    return (
        <>
            {isHidden && <div className="event-form__wrapper" style={{ display: `${!isHidden ? "none" : ''}` }}>
                <button className="event-form__close-btn" onClick={() => setIsHidden(null)}></button>
                <div className="event-form__inner" style={{ display: `${!isHidden ? "none" : ''}` }}>
                    <DayPlanForm setIsOpen={setIsHidden as (val: Date | null) => void} date={isHidden.date} workPlan={isHidden}/>
                </div>
            </div>}
        </>
    )
}