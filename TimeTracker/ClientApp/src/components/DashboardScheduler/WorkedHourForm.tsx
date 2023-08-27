import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { LargeButton } from "@components/UI";
import { months } from '..';
import { CalendarCell, CreateWorkedHourType, SchedulerWorkPlan, SetWorkPlanType, UpdateWorkedHourType, WorkPlan, WorkedHour } from '@redux/types';
import { useAppDispatch, useTypedSelector } from '@hooks/customHooks';
import { GetFormattedDateString, GetFormattedUTCDateString, GetFormattedUTCTimeString } from '../../utils';
import { deleteUserWorkedHour, deleteWorkPlan, deleteWorkedHour, editUserWorkedHour, editWorkedHour, setWorkPlan } from '@redux/slices';
import { WorkedHourFormProps } from '.';

interface TimeInputs {
    startTime: string
    endTime: string
}

interface Inputs extends TimeInputs {
    id: number,
}

export const WorkedHourForm = ({ setIsOpen, workedHour }: WorkedHourFormProps) => {
    const defaultValues: TimeInputs = {
        startTime: workedHour ? workedHour.startTime : '08:00',
        endTime: workedHour ? workedHour.endTime : '18:00',
    }
    const showDate = `${workedHour.date.getDate()} ${months[workedHour.date.getMonth()]}`;
    const dispatch = useAppDispatch();

    const [timeInputs, setTimeInputs] = useState<TimeInputs>(defaultValues);

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                id: workedHour.id,
            }
        });

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTimeInputs({ ...timeInputs, [name]: value });
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const dateStr = GetFormattedDateString(workedHour.date)

        dispatch(editUserWorkedHour({
            id: data.id,
            startTime: GetFormattedUTCTimeString(data.startTime, dateStr),
            endTime: GetFormattedUTCTimeString(data.endTime, dateStr),
        } as UpdateWorkedHourType))
        setIsOpen(null);
    }

    const handleDelete = (workedHour: WorkedHour) => {
        dispatch(deleteUserWorkedHour(workedHour.id))
        setIsOpen(null);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <span>{`Manage work sprint on ${showDate}:`}</span>

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
            <div className='button-group-wrapper'>
                <LargeButton type="submit" value="Change work spring" />
                <div className='delete-button-wrapper'>
                    <button type="button" className="reset-btn" onClick={() => { handleDelete(workedHour) }}>
                        Delete
                    </button>
                </div>
            </div>
        </form>
    );
};