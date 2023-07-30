import {DayOfMoth} from "@components/Calendar/Calendar.tsx";



export function getMothDays(year: number, month: number):DayOfMoth[] {
    const arr:DayOfMoth[] =[];
    const daysOfMonth = getDaysInMonth(year, month);
    const nextMonthDays = 7 * 5 - daysOfMonth;
    for (let i = 0; i < daysOfMonth; i++) {
        arr[i] = {day: i + 1, isCurrentMoth: true, year: year, month: month};
    }
    for (let i = 0; i < nextMonthDays; i++) {
        arr[daysOfMonth + i] = {day: i + 1, isCurrentMoth: false};
    }

    return arr;
}

export const monthsMap: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}