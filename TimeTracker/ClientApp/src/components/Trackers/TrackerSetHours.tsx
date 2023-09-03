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

export const TrackerSetHours = ({ userId, workedHour }: { userId: number, workedHour?: WorkedHour }) => {
    const defaultValues: TimeInputs = {
        startTime: workedHour ? workedHour.startTime.slice(0, 5) : '08:00',
        endTime: workedHour ? workedHour.endTime.slice(0, 5) : '16:00',
    }

    const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<string>(GetFormattedDateString(new Date));
    const [timeInputs, setTimeInputs] = useState<TimeInputs>(defaultValues);

    const dispatch = useDispatch();

    const handleShowDatePicker = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShowDatePicker(!showDatePicker);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setShowDatePicker(!showDatePicker);
    }

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
                date: workedHour ? GetFormattedDateString(workedHour.date) : undefined
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (workedHour)
            dispatch(editWorkedHour({
                id: workedHour.id,
                startTime: GetFormattedUTCTimeString(data.startTime, data.date),
                endTime: GetFormattedUTCTimeString(data.endTime, data.date),
            } as UpdateWorkedHourType))
        else {
            data.date = selectedDate;
            dispatch(createWorkedHour({
                userId: userId,
                startTime: GetFormattedUTCTimeString(data.startTime, data.date),
                endTime: GetFormattedUTCTimeString(data.endTime, data.date),
                date: `${data.date}T00:00:00`
            } as CreateWorkedHourType))
        }
    }
    return (
        <>
            {workedHour ? <CurrentDateElement date={workedHour.date} showFullDate={true} /> : <SelectedDateElement date={selectedDate} />}

            {!workedHour ?
                <div className="time-range__date-wrapper">
                    <button type='button' onClick={handleShowDatePicker}>
                        <input
                            type="date"
                            className="date-picker__input"
                            value={selectedDate}
                            {...register("date")}
                            onChange={handleDateChange}
                            style={!showDatePicker ? { display: 'none' } : {}} />
                    </button>
                </div> : <></>}

            <div className="set-hours-tracker">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="time-range__wrapper">
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
                            <div className='single-btn-wrapper'>
                                <button type="submit">Add</button>
                            </div>
                            :
                            <>
                                <div className='double-btn-wrapper'>
                                    <button type='submit' >Change</button>
                                    <button type="button" onClick={handleDelete}>Delete</button>
                                </div>
                            </>}
                    </div>
                </form>
            </div>
        </>
    );
};