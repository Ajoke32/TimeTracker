import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { LargeButton, TextInput, Dropdown } from "@components/UI";
import "./eventForms.css"
import { CalendarCell, CreateCalendarEventType } from '@redux/types';
import { months } from '..';
import { useAppDispatch, useTypedSelector } from '@hooks/customHooks';
import { createCalendarEvent } from '@redux/slices';
import { GetFormattedDateString } from '../../utils';

type Inputs = {
    date: Date,
    title: string,
    eventType: number
}

export const AddEventForm = ({ cell }: { cell: CalendarCell }) => {

    const showDate = `${cell.date.getDate()} ${months[cell.date.getMonth()]}`;
    const dispatch = useAppDispatch()

    const { register, handleSubmit, setValue,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                title: '',
                eventType: cell.isHoliday ? 0 : 1,
                date: cell.date
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(createCalendarEvent({
            date: GetFormattedDateString(new Date(data.date)),
            eventType: data.eventType,
            title: data.title
        } as CreateCalendarEventType))

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <span>Add event for {showDate}</span>

            <TextInput name="title" placeholder="Title" register={register("title", { required: "Title can't be empty!" })} errors={errors.title}/>

            <LargeButton type="submit" value="Add event" />
        </form>
    );
};
