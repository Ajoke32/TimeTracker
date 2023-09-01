import React from 'react';
import moment from "moment/moment";
import {WorkedHour} from "@redux/types";
import {FormattedWorkedHours} from "@redux/intrerfaces";

interface WorkedHoursListProps{
    workedHours:WorkedHour[]
}

const WorkedHoursList = ({workedHours}:WorkedHoursListProps) => {
    return (
        <div className={"work-plans-wrapper"}>
            <h2>Recent activity</h2>
            <div className={'work-plans'}>
                {workedHours.map(w => {
                    return <div key={w.id}  className="work-plan green with-date">
                        <span >{moment(w.startTime, 'hh:mm').format("hh:mm")} -- {moment(w.endTime, 'hh:mm').format("hh:mm")}</span>
                        <span>{moment(w.date).format("DD-MM-YYYY")}</span>
                    </div>
                })}
            </div>
        </div>
    );
};

export default WorkedHoursList;
