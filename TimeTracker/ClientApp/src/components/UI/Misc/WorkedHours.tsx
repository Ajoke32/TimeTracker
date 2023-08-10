import { WorkedHour } from "@redux/types"

export const WorkedHours = ({workedHour} : {workedHour: WorkedHour}) => {
    return (
        <>
            <div className="worked-time-range__wrapper">
                <div className="time-range__inner">
                    <input
                        type="time"
                        className="time-input"
                        value={workedHour.startTime}
                        disabled={true}
                    />
                </div>
                <div className="time-range__separator">
                    <span>-</span>
                </div>
                <div className="time-range__inner">
                    <input
                        type="time"
                        className="time-input"
                        value={workedHour.endTime}
                        disabled={true}
                    />
                </div>
            </div>
        </>
    )
}