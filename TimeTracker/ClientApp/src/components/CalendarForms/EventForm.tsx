import { SubmitHandler, useForm } from "react-hook-form";
import { LargeButton, TextInput, } from "@components/UI";
import "./eventForms.css"
import { CalendarCell, SetCalendarEventType } from '@redux/types';
import { months } from '..';
import { useAppDispatch } from '@hooks/customHooks';
import { setCalendarEvent } from '@redux/slices';
import { GetFormattedDateString } from '../../utils';
import { EventFormProps } from ".";

type Inputs = {
    id: number | undefined,
    date: Date,
    title: string,
    eventType: number
}

export const EventForm = ({ date, setIsOpen, event }: EventFormProps) => {

    const showDate = `${date.getDate()} ${months[date.getMonth()]}`;
    const dispatch = useAppDispatch()

    const isHoliday = (date: Date): boolean => {
        return date.getDay() == 0 || date.getDay() == 6
    }

    const { register, handleSubmit, setValue,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                id: event?.id,
                eventType: isHoliday(date) ? 1 : 0,
                date: date
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        // dispatch(setCalendarEvent({
        //     date: GetFormattedDateString(new Date(data.date)),
        //     eventType: data.eventType,
        //     title: data.title
        // } as SetCalendarEventType))
        //setIsOpen(null);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <span>{event ? `Change event for ${showDate}`: `Add event for ${showDate}`}</span>

            <TextInput name="title" placeholder="Title" register={register("title", { required: "Title can't be empty!" })} errors={errors.title} />

            <LargeButton type="submit" value={event ? "Change event" : "Add event"} />
        </form>
    );
};
