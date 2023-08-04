import { WorkedHour, WorkedTime } from "@redux/types";

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
    let result = "";

    result = result.concat(`${date.getFullYear().toString()}-`);
    result = result.concat(date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`);
    result = result.concat(date.getDate() < 10 ? `-0${date.getDate()}` : `-${date.getDate()}`);

    return result;
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

    const utcStart = `${wh.date} ${wh.startTime}`;
    const utcEnd = `${wh.date} ${wh.endTime}`

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