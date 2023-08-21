import { SchedulerWorkPlan, SchedulerWorkedHour, WorkPlan } from "@redux/types"
import { hours } from "..";
import { useTypedSelector } from "@hooks/customHooks";

export const TimeRow = ({ workedHour, color, onClick }: { workedHour: SchedulerWorkedHour, color: string, onClick: React.Dispatch<React.SetStateAction<SchedulerWorkPlan | null>> }) => {

    const { user } = useTypedSelector(state => state.auth)

    const convertTimeToIndex = (time: string) => {
        const [hoursStr, minutesStr] = time.split(":");

        return parseInt(minutesStr, 10) + parseInt(hoursStr, 10) * 60;
    };

    return (
        <div className="content-row" >
            {workedHour.workPlans.map((item, i) =>
                convertTimeToIndex(item.totalTime) > 15 &&
                <div key={i}
                    className="working-hours__inner-row"
                    style={{
                        width: `${(convertTimeToIndex(item.totalTime) / (hours.length * 60)) * 100}%`,
                        background: color,
                        left: `${((convertTimeToIndex(item.startTime) - convertTimeToIndex(hours[0])) / (hours.length * 60)) * 100}%`
                    }}>
                    <div className="time-range__wrapper">
                        <span className="">{item.startTime.slice(0, -3)} - {item.endTime.slice(0, -3)}</span>
                    </div>
                    {
                        workedHour.userId != user!.id ?
                            <div className='user-name__wrapper'>
                                <span className=''>{item.user}</span>
                            </div> :
                            <div className='user-name__wrapper'>
                                <div className="settings-img__wrapper" onClick={() => { onClick(item) }}></div>
                            </div>
                    }

                </div>
            )}
        </div>
    )
}