import React, { useEffect, useState } from 'react';
import { SmallButton } from "@components/UI";
import { useTypedSelector } from "@hooks/customHooks";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from 'react-hook-form';
import { createWorkedHour, editWorkedHour } from '@redux/slices';
import { SetWorkedHoursType, UpdateWorkedHoursType, WorkedTime } from '@redux/types';
import { GetFormattedDateString, GetFormattedTimeString } from '../../utils/dateTimeHelpers';

type Inputs = {
    startTime: string
    finishTime: string
    date: Date
}

export const TrackerSetHours = ({ id }: { id?: number }) => {
    const dispatch = useDispatch();
    const { user } = useTypedSelector(state => state.auth)
    const workedHours = useTypedSelector((state) => state.workedHours);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const handleShowDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur'
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const [startHours, startMinutes] = data.startTime.split(":");
        const [finishHours, finishMinutes] = data.finishTime.split(":");
        let resHours, resMinutes;

        resHours = parseInt(finishHours) - parseInt(startHours);
        if (startMinutes > finishMinutes)
            --resHours
        resMinutes =
            (startMinutes > finishMinutes)
                ? 60 - parseInt(startMinutes) + parseInt(finishMinutes)
                : parseInt(finishMinutes) - parseInt(startMinutes);

        if (id)
            dispatch(editWorkedHour({
                id: id,
                workedTime: GetFormattedTimeString({ hours: resHours, minutes: resMinutes, seconds: 0 })
            } as UpdateWorkedHoursType))
        else {
            dispatch(createWorkedHour({
                userId: user!.id,
                date: GetFormattedDateString(new Date(data.date)),
                workedTime: GetFormattedTimeString({ hours: resHours, minutes: resMinutes, seconds: 0 })
            } as SetWorkedHoursType))
        }
    }
    return (
        <div className="set-hours-tracker">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="time-range__wrapper">
                    <div className="time-range__inner">
                        <input
                            type="time"
                            className="time-input"
                            {...register("startTime")}
                        />
                    </div>
                    <div className="time-range__separator">
                        <span>-</span>
                    </div>
                    <div className="time-range__inner">
                        <input
                            type="time"
                            className="time-input"
                            {...register("finishTime")}
                        />
                    </div>
                </div>

                {!id ? <div className="time-range__date-wrapper">
                    <div onClick={handleShowDatePicker}>
                        <input
                            type="date"
                            className="date-picker__input"
                            {...register("date")}
                            style={!showDatePicker ? { display: 'none' } : {}} />
                    </div>
                </div> : <></>}


                <div className="tracker-btn__wrapper">
                    <SmallButton type="submit" value={id ? "Change" : "Add"} />
                </div>
            </form>
        </div>
    );
};