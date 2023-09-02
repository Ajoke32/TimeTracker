import { SchedulerWorkPlan, SchedulerWorkedHour, WorkPlan } from "@redux/types"
import {hours, ProfileAvatar} from "..";
import { useTypedSelector } from "@hooks/customHooks";
import { convertTimeToIndex } from "../../utils";
import {useState} from "react";

export const TimeRow = ({ workedHour, color, onClick}: { workedHour: SchedulerWorkedHour, color: string, onClick: React.Dispatch<React.SetStateAction<SchedulerWorkPlan | null>>}) => {

    const { user } = useTypedSelector(state => state.auth)
    const minMinutesWorked = 30;
    

    return (
        <div className="content-row" >
            <div className="user-name__wrapper">
                <ProfileAvatar initials={`${user?.firstName[0]}${user?.lastName[0]}`}/>
                <span>{user?.firstName} {user?.lastName}</span>
            </div>
            
            {workedHour.workPlans.map((item, i) =>
                convertTimeToIndex(item.totalTime) >= minMinutesWorked &&
                <div key={i}
                    className={workedHour.userId == user!.id
                        ? "working-hours__inner-row clickable"
                        : "working-hours__inner-row"}
                     style={{
                         width: `${(convertTimeToIndex(item.totalTime) / (hours.length * 60)) * 100}%`,
                         background: color,
                         left: `${((convertTimeToIndex(item.startTime) - convertTimeToIndex(hours[0])) / (hours.length * 60)) * 100}%`
                     }}
                    onClick={() => { if (workedHour.userId == user!.id) onClick(item) }}>
                    
                    <div className="time-range__wrapper">
                        <span className="details-span">{item.startTime.slice(0, -3)} - {item.endTime.slice(0, -3)}</span>
                    </div>

                    {
                        workedHour.userId != user!.id &&
                        <div className='user-name__wrapper'>
                            <span className=''>{item.user}</span>
                        </div>
                    }

                </div>
            )}
        </div>
    )
}