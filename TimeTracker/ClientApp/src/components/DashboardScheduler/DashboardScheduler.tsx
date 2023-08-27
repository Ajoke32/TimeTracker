import "./dashboardScheduler.css"
import { useState, useEffect, useRef } from 'react';
import { CurrentDateElement } from "@components/UI";
import { H4 } from "@components/Headings";
import { SchedulerWorkPlan, WorkedHour } from '@redux/types';
import { useAppDispatch, useTypedSelector } from '@hooks/customHooks';
import { DashboardSchedulerModal, DateRangePicker, PickerDateRange, UsersRadioTable, dashboardHours } from '..';
import moment from "moment";
import { GetFormattedDateString, GetPickerDateRange, convertTimeToIndex, generateColors } from "../../utils";
import { fetchUserWorkedHours } from "@redux/slices";

export const DashboardScheduler = () => {
    const dispatch = useAppDispatch()

    const { user } = useTypedSelector(state => state.auth)
    const { workedHours } = useTypedSelector(state => state.user)

    const [dateRange, setDateRange] = useState<PickerDateRange>({
        startDate: moment().startOf('week'),
        endDate: moment().endOf('week')
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
            <DashboardSchedulerModal isHidden={isModalHidden} setIsHidden={setIsModalHidden}/>
            <div className="worked-hours-wrapper">
                <div className="table-header-wrapper">
                    <div className="show-datepicker__btn" onClick={() => { setIsFormHidden(!isFormHidden) }} />
                    {dateRange.startDate &&
                        <CurrentDateElement date={dateRange.startDate?.toDate()!} showFullDate={true} />
                    }
                    {dateRange.endDate && !dateRange.endDate.isSame(dateRange.startDate) &&
                        <>
                            <div className="date-range__separator">
                                <span>-</span>
                            </div>
                            <CurrentDateElement date={dateRange.endDate?.toDate()!} showFullDate={true} />
                        </>
                    }

                    {isFormHidden &&
                        <div className="date-range-picker-wrapper">
                            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                        </div>
                    }
                </div>
                <div className="rotate-wrapper">
                    <div className="worked-hours-table">
                        <div className="header-hours-wrapper">
                            {dashboardHours.map((time, index) => (
                                <div className="header-hour" key={index}><span>{time}</span></div>
                            ))}
                        </div>
                        <div className="worked-hours-content">
                            {workedHours.map((wh, index) => (
                                <div className="content-row" key={wh.date.getTime()}>
                                    {wh.workedHours.map((item, i) =>
                                        convertTimeToIndex(item.totalTime) > 15 &&
                                        <div key={i}
                                            className="working-hours__inner-row clickable"
                                            style={{
                                                width: `${(convertTimeToIndex(item.totalTime) / (dashboardHours.length * 60)) * 100}%`,
                                                background: colors[index],
                                                left: `${((convertTimeToIndex(item.startTime) - convertTimeToIndex(dashboardHours[0])) / (dashboardHours.length * 60)) * 100}%`
                                            }}
                                            onClick={() => { setIsModalHidden(item) }}>
                                            <div className="time-range__wrapper">
                                                <span className="">{item.startTime.slice(0, -3)} - {item.endTime.slice(0, -3)}</span>
                                            </div>
                                            {
                                                <div className='user-name__wrapper'>
                                                    <span className=''>{GetFormattedDateString(item.date)}</span>
                                                </div>
                                            }

                                        </div>
                                    )}
                                </div>
                            ))}
                            {Array.from({ length: defaultRowsCount - workedHours.length }, (_, index) => (
                                <div className="content-hour" key={index}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-side-form-wrapper">
                <div className="side-form">
                    <UsersRadioTable selectedUser={selectedUser} setSelectedUser={setSelectedUser} dateRange={dateRange} />
                </div>
            </div>
        </div>

    );
};