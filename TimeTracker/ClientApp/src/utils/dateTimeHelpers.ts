import { CalendarEvent, DateRangeType, WorkPlan, WorkedHour, WorkedTime } from "@redux/types";
import { addMonth, substractMonth } from ".";
import moment from "moment";
import { PickerDateRange } from "@components/index";
import { CreateWorkedHourType } from "@redux/types";
import { TimerSliceState } from "@redux/index";

export const GetFormattedUTCDateString = (date: Date): string => {
    let result = "";

    result = result.concat(`${date.getUTCFullYear()}-`);
    result = result.concat(date.getUTCMonth() < 9 ? `0${date.getUTCMonth() + 1}` : `${date.getUTCMonth() + 1}`);
    result = result.concat(date.getUTCDate() < 10 ? `-0${date.getUTCDate()}` : `-${date.getUTCDate()}`);

    return result;
}

export const GetFormattedUTCTimeString = (time: string, date: string): string => {
    let result = "";

    const localDate = new Date(`${date} ${time}`)
    const hours = localDate.getUTCHours();
    const minutes = localDate.getUTCMinutes();
    const seconds = localDate.getUTCSeconds();

    result = result.concat(hours > 9 ? `${hours}:` : `0${hours}:`)
    result = result.concat(minutes > 9 ? `${minutes}` : `0${minutes}`)
    result = result.concat(seconds > 9 ? `:${seconds}` : `:0${seconds}`)

    return result;
}

export const GetFormattedDateString = (date: Date): string => {
    return moment(date).format("YYYY-MM-DD")
}

export const GetFormattedTimeString = (time: WorkedTime | string): string => {
    let result = "";

    if (typeof (time) === 'string')
        time = GetTimeFromString(time);

    result = result.concat(time.hours > 9 ? `${time.hours}:` : `0${time.hours}:`)
    result = result.concat(time.minutes > 9 ? `${time.minutes}` : `0${time.minutes}`)
    result = result.concat(time.seconds > 9 ? `:${time.seconds}` : `:0${time.seconds}`)

    return result;
}

export const GetTimeFromString = (time: string): WorkedTime => {
    const values = time.split(':')
    return {
        hours: parseInt(values[0]) ?? 0,
        minutes: parseInt(values[1]) ?? 0,
        seconds: parseInt(values[2]) ?? 0,
    } as WorkedTime
}

export const GetLocalDateFromUTC = (utc: string): Date => {
    return new Date(`${utc} UTC`);
}

export const GetLocalWorkedHour = (wh: WorkedHour): WorkedHour => {
    const dateOnly = wh.date.toString().split("T")[0]

    const utcStart = `${dateOnly} ${wh.startTime}`;
    const utcEnd = `${dateOnly} ${wh.endTime}`

    const localStart = GetLocalDateFromUTC(utcStart)
    const localEnd = GetLocalDateFromUTC(utcEnd)

    const localStartTime: WorkedTime = {
        hours: localStart.getHours(),
        minutes: localStart.getMinutes(),
        seconds: localStart.getSeconds()
    }
    const localEndTime: WorkedTime = {
        hours: localEnd.getHours(),
        minutes: localEnd.getMinutes(),
        seconds: localEnd.getSeconds()
    }

    wh.date = localStart
    wh.startTime = GetFormattedTimeString(localStartTime)
    wh.endTime = GetFormattedTimeString(localEndTime)

    return wh;
}

export const GetThreeMonthDateRange = (date: Date): DateRangeType => {
    const previousMonth = substractMonth(date);
    const nextMonth = addMonth(date);

    const firstDayOfMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1)
    const lastDayOfMonth = new Date(nextMonth.getFullYear(), addMonth(nextMonth).getMonth(), 0);

    const firstTime = GetFormattedUTCTimeString("00:00:00", GetFormattedDateString(firstDayOfMonth))
    const lastTime = GetFormattedUTCTimeString("00:00:00", GetFormattedDateString(lastDayOfMonth))

    return {
        startDate: `${GetFormattedUTCDateString(firstDayOfMonth)}T${firstTime}`,
        endDate: `${GetFormattedUTCDateString(lastDayOfMonth)}T${lastTime}`
    }
}

export const GetPickerDateRange = (range: PickerDateRange): DateRangeType => {
    const startDate = range.startDate!.toDate();
    const endDate = range.endDate ? range.endDate.toDate() : startDate;

    const firstTime = GetFormattedUTCTimeString("00:00:00", GetFormattedDateString(startDate))
    const lastTime = GetFormattedUTCTimeString("00:00:00", GetFormattedDateString(endDate))

    return {
        startDate: `${GetFormattedDateString(startDate)}T${firstTime}`,
        endDate: `${GetFormattedDateString(endDate)}T${lastTime}`
    }
}

export const GetOneMonthDateRange = (date: Date): DateRangeType => {

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), addMonth(date).getMonth(), 0);

    const firstTime = GetFormattedUTCTimeString("00:00:00", GetFormattedDateString(firstDayOfMonth))
    const lastTime = GetFormattedUTCTimeString("00:00:00", GetFormattedDateString(lastDayOfMonth))

    return {
        startDate: `${GetFormattedUTCDateString(firstDayOfMonth)}T${firstTime}`,
        endDate: `${GetFormattedUTCDateString(lastDayOfMonth)}T${lastTime}`
    }
}

export const GetLocalCalendarEvent = (event: CalendarEvent): CalendarEvent => {
    const dateOnly = event.date.toString().split("T")[0]

    event.date = GetLocalDateFromUTC(dateOnly);

    return event;
}

export const GetLocalWorkPlan = (plan: WorkPlan): WorkPlan => {
    const dateOnly = plan.date.toString().split("T")[0]

    const utcStart = `${dateOnly} ${plan.startTime}`;
    const utcEnd = `${dateOnly} ${plan.endTime}`

    const localStart = GetLocalDateFromUTC(utcStart)
    const localEnd = GetLocalDateFromUTC(utcEnd)

    const localStartTime: WorkedTime = {
        hours: localStart.getHours(),
        minutes: localStart.getMinutes(),
        seconds: localStart.getSeconds()
    }

    const localEndTime: WorkedTime = {
        hours: localEnd.getHours(),
        minutes: localEnd.getMinutes(),
        seconds: localEnd.getSeconds()
    }

    plan.date = localStart
    plan.startTime = GetFormattedTimeString(localStartTime)
    plan.endTime = GetFormattedTimeString(localEndTime)

    return plan;
}

export const ParseTimeString = (time: string): Date => {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    const date = new Date();

    date.setHours(hours, minutes, seconds)

    return date;
}

export const CalculateTimeDifference = (timeString1: string, timeString2: string): number => {
    const time1 = ParseTimeString(timeString1);
    const time2 = ParseTimeString(timeString2);

    const timeDifference = Math.abs(time2.getTime() - time1.getTime());
    return timeDifference
}

export const GetFormattedTimeDifference = (timeString1: string, timeString2: string): string => {
    const totalSeconds = Math.floor(CalculateTimeDifference(timeString1, timeString2) / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const convertTimeToIndex = (time: string) => {
    const [hoursStr, minutesStr] = time.split(":");

    return parseInt(minutesStr, 10) + parseInt(hoursStr, 10) * 60;
};

export const GetCreateWorkedHour = (state: TimerSliceState, timestamp: number, userId: number) => {
    const startDate = new Date(timestamp);
    const stopDate = moment(timestamp)
        .add(state.hours, "hours")
        .add(state.minutes, 'minutes')
        .add(state.seconds, 'seconds')
        .toDate();

    const startTime: WorkedTime = {
        hours: startDate.getUTCHours(),
        minutes: startDate.getUTCMinutes(),
        seconds: startDate.getUTCSeconds()
    }

    const endTime: WorkedTime = {
        hours: stopDate.getUTCHours(),
        minutes: stopDate.getUTCMinutes(),
        seconds: stopDate.getUTCSeconds()
    }
    return {
        userId: userId,
        date: moment(GetFormattedUTCDateString(stopDate)).format("YYYY-MM-DDThh:mm:ss"),
        startTime: GetFormattedTimeString(startTime),
        endTime: GetFormattedTimeString(endTime)
    } as CreateWorkedHourType
}