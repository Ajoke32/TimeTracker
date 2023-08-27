import { DayPlanForm } from "@components/CalendarForms";
import { DashboardSchedulerModalProps } from ".";
import { WorkedHourForm } from "@components/DashboardScheduler";

export const DashboardSchedulerModal = ({ isHidden, setIsHidden }: DashboardSchedulerModalProps) => {
    return (
        <>
            {isHidden && <div className="event-form__wrapper" style={{ display: `${!isHidden ? "none" : ''}` }}>
                <button className="event-form__close-btn" onClick={() => setIsHidden(null)}></button>
                <div className="event-form__inner" style={{ display: `${!isHidden ? "none" : ''}` }}>
                    <WorkedHourForm setIsOpen={setIsHidden} workedHour={isHidden} />
                </div>
            </div>}
        </>
    )
}