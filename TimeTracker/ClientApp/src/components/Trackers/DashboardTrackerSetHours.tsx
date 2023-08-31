import React, { useState } from 'react';
import { SmallButton, SelectedDateElement, CurrentDateElement } from "@components/UI";
import { useTypedSelector } from "@hooks/customHooks";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from 'react-hook-form';
import { createWorkedHour, deleteWorkedHour, deleteWorkedHourFail, editWorkedHour } from '@redux/slices';
import { WorkedHour, UpdateWorkedHourType, CreateWorkedHourType } from '@redux/types';
import { GetFormattedDateString, GetFormattedUTCDateString, GetFormattedUTCTimeString } from '../../utils';

type Inputs = {
    startTime: string
    endTime: string
    date: string
}

interface TimeInputs {
    startTime: string
    endTime: string
}

export const DashboardTrackerSetHours = ({ workedHour }: { workedHour: WorkedHour }) => {
    const defaultValues: TimeInputs = {
        startTime: workedHour ? workedHour.startTime.slice(0, 5) : '08:00',
        endTime: workedHour ? workedHour.endTime.slice(0, 5) : '16:00',
    }

    const [timeInputs, setTimeInputs] = useState<TimeInputs>(defaultValues);

    const dispatch = useDispatch();
    const { user } = useTypedSelector(state => state.auth)

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTimeInputs({ ...timeInputs, [name]: value });
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(deleteWorkedHour(workedHour!.id));
    }

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                date: GetFormattedDateString(workedHour.date)
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(editWorkedHour({
            id: workedHour.id,
            startTime: GetFormattedUTCTimeString(data.startTime, data.date),
            endTime: GetFormattedUTCTimeString(data.endTime, data.date),
        } as UpdateWorkedHourType))
    }
    return (
            <div className="set-tracker-hours">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="worked-time-range__wrapper">
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

                    <div className="tracker-set-btn__wrapper">
                        {!workedHour ?
                            <SmallButton type="submit" value="Add" /> :
                            <>
                                <div className='double-btn-wrapper'>
                                    <button type='submit' >Change</button>
                                    <button type="button" onClick={handleDelete}>Delete</button>
                                </div>
                            </>}
                    </div>
                </form>
            </div>
    );
};