import { SchedulerWorkPlan, SchedulerWorkedHour, WorkPlan } from "@redux/types"
import { hours } from "..";
import { useTypedSelector } from "@hooks/customHooks";
import { convertTimeToIndex } from "../../utils";

export const TimeRow = ({ workedHour, color, onClick }: { workedHour: SchedulerWorkedHour, color: string, onClick: React.Dispatch<React.SetStateAction<SchedulerWorkPlan | null>> }) => {

    const { user } = useTypedSelector(state => state.auth)


    return (
        <div className="content-row" >
            {workedHour.workPlans.map((item, i) =>
                convertTimeToIndex(item.totalTime) > 15 &&
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
                        <span className="">{item.startTime.slice(0, -3)} - {item.endTime.slice(0, -3)}</span>
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