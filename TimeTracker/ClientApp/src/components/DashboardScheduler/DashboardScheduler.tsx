import "./dashboardScheduler.css"
import React, { useState, useEffect, useRef } from 'react';
import { CurrentDateElement, Loader } from "@components/UI";
import { H4 } from "@components/Headings";
import { SchedulerWorkPlan, WorkedHour } from '@redux/types';
import { useAppDispatch, useTypedSelector } from '@hooks/customHooks';
import { DashboardSchedulerModal, DateRangePicker, PickerDateRange, UsersRadioTable, dashboardHours } from '..';
import moment from "moment";
import { GetFormattedDateString, GetPickerDateRange, convertTimeToIndex, generateColors } from "../../utils";
import { fetchUserWorkedHours } from "@redux/slices";
import TimeTracker from "@components/Trackers/TimeTracker";

export const DashboardScheduler = () => {
    const dispatch = useAppDispatch()

    const { user } = useTypedSelector(state => state.auth)
    const { workedHours, loading } = useTypedSelector(state => state.user)

    const [dateRange, setDateRange] = useState<PickerDateRange>({
        startDate: moment().subtract(1, 'day'),
        endDate: moment().add(1, 'day')
    })
    const [selectedUser, setSelectedUser] = useState<number>(user!.id)
    const [isFormHidden, setIsFormHidden] = useState<boolean>(false);
    const [isModalHidden, setIsModalHidden] = useState<null | WorkedHour>(null);
    const [colors, setColors] = useState<string[]>([])

    const defaultRowsCount = 6;

    useEffect(() => {
        setColors(generateColors(0, workedHours.length))
    }, [workedHours])

    useEffect(() => {
        dispatch(fetchUserWorkedHours({
            userId: selectedUser,
            dateRange: GetPickerDateRange(dateRange)
        }))
    }, [dateRange])

    return (
        <div className="dashboard-component-wrapper">
            <DashboardSchedulerModal isHidden={isModalHidden} setIsHidden={setIsModalHidden} />

            <div className="worked-hours-wrapper">
                {loading
                    ?
                    <div className="loader-wrapper">
                        <Loader />
                    </div>
                    : workedHours.map((wh) => (
                        <React.Fragment key={wh.date.toDateString()}>
                            {wh.workedHours.map((item, i) =>
                                <TimeTracker workedHour={item} key={item.id} />
                            )}
                        </React.Fragment>
                    ))
                }
            </div>
            <div className="right-side-form">
                <div className="date-range__wrapper">
                    <div className="show-datepicker__btn" onClick={() => { setIsFormHidden(!isFormHidden) }} />
                    {dateRange.startDate &&
                        <div className="current-date__wrapper">
                            <span>{GetFormattedDateString(dateRange.startDate.toDate())}</span>
                        </div>
                    }
                    {dateRange.endDate && !dateRange.endDate.isSame(dateRange.startDate) &&
                        <>
                            <div className="date-range__separator">
                                <span>-</span>
                            </div>
                            <div className="current-date__wrapper">
                                <span>{GetFormattedDateString(dateRange.endDate.toDate())}</span>
                            </div>
                        </>
                    }
                </div>
                {isFormHidden &&
                    <div className="date-range-picker-wrapper">
                        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                    </div>
                }

                <UsersRadioTable selectedUser={selectedUser} setSelectedUser={setSelectedUser} dateRange={dateRange} />
            </div>
        </div >

    );
};