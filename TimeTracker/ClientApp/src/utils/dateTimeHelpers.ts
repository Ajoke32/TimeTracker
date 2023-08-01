import { WorkedTime } from "@redux/types";

export const GetFormattedDateString = (date: Date): string => {
    let result: string = "";

    result = result.concat(`${date.getFullYear().toString()}-`);
    result = result.concat(
        date.getMonth() < 9
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`
    );
    result = result.concat(`-${date.getDate()}`);

    return result;
}

export const GetFormattedTimeString = (time: WorkedTime): string => {
    let result: string = "";

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