import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { LargeButton } from "@components/UI";
import { months } from '..';
import "./eventForms.css"
import { CalendarCell, CreateWorkedHourType } from '@redux/types';
import { useAppDispatch, useTypedSelector } from '@hooks/customHooks';
import { GetFormattedDateString, GetFormattedUTCDateString, GetFormattedUTCTimeString } from '../../utils';
import { createWorkPlan } from '@redux/slices';

type Inputs = {
    userId: number,
    date: Date,
    startTime: string,
    endTime: string,
}
interface TimeInputs {
    startTime: string
    endTime: string
}

export const DayPlanForm = ({ cell,setIsOpen}: { cell: CalendarCell,setIsOpen:(val:boolean)=>void }) => {
    const defaultValues: TimeInputs = {
        startTime: '08:00',
        endTime: '18:00',
    }
    const showDate = `${cell.date.getDate()} ${months[cell.date.getMonth()]}`;
    const dispatch = useAppDispatch();

    const [showDateMenu, setShowDateMenu] = useState<boolean>(false);
    const [timeInputs, setTimeInputs] = useState<TimeInputs>(defaultValues);


    const { user } = useTypedSelector(state => state.auth)

    const { register, handleSubmit, setValue,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                userId: user!.id,
                date: cell.date
            }
        });

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTimeInputs({ ...timeInputs, [name]: value });
    }


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(createWorkPlan({
            userId: user!.id,
            startTime: GetFormattedUTCTimeString(data.startTime, GetFormattedUTCDateString(cell.date)),
            endTime: GetFormattedUTCTimeString(data.endTime, GetFormattedUTCDateString(cell.date)),
            date: GetFormattedDateString(new Date(data.date))
        } as CreateWorkedHourType))
        setIsOpen(false);
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <span>Add work plan for {showDate}</span>

            <div className="time-range-wrapper">
                <div className="time-range__inner">
                    <input
                        type="time"
                        className="time-input"
                        value={timeInputs.startTime}
                        {...register("startTime")}
                        onChange={handleTimeChange}
                    />
                </div>
                <div className="time-range__separator">
                    <span>-</span>
                </div>
                <div className="time-range__inner">
                    <input
                        type="time"
                        className="time-input"
                        value={timeInputs.endTime}
                        {...register("endTime")}
                        onChange={handleTimeChange}
                    />
                </div>
            </div>

            <LargeButton type="submit" value="Add plan" />
        </form>
    );
};