import { CalendarCell, CalendarEvent, WorkPlan } from "@redux/types";
import { GetFormattedDateString } from ".";
import { SortedCalendarArr } from "@redux/intrerfaces";

export function setPrevMonthDates(date: Date, events: CalendarEvent[], plans: SortedCalendarArr[]) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

    if (firstDay.getDay() !== 1) {
        const dates: CalendarCell[] = [];
        let lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        let i = firstDay.getDay() ? 1 : 0;
        const j = firstDay.getDay() ? firstDay.getDay() : 6;

        for (i; i < j; i++) {
            let cellDate = new Date(date.getFullYear(), date.getMonth() - 1, lastDateOfMonth--);
            dates.push(createCalendarCell(cellDate, events, plans));
        }

        return dates.reverse();
    }

    return [];
}

export function setCurrentMonthDates(date: Date, events: CalendarEvent[], plans: SortedCalendarArr[]) {
    const dates: CalendarCell[] = [];
    const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let cellDate = new Date(date.getFullYear(), date.getMonth(), i);
        dates.push(createCalendarCell(cellDate, events, plans));
    }
    return dates;
}

export function setNextMonthDates(date: Date, events: CalendarEvent[], plans: SortedCalendarArr[]) {
    const dates: CalendarCell[] = [];
    const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let day = new Date(date.getFullYear(), date.getMonth(), lastDateOfMonth).getDay();

    for (let i = 1; day < 14; i++) {
        let cellDate = new Date(date.getFullYear(), date.getMonth() + 1, i);
        dates.push(createCalendarCell(cellDate, events, plans));
        day++;
    }

    return dates;
}

export function addMonth(date: Date): Date {
    const newDate = new Date(date);

    const currentMonth = newDate.getMonth();
    newDate.setMonth(currentMonth + 1);

    if (newDate.getMonth() > 11) {
        newDate.setFullYear(newDate.getFullYear() + 1);
        newDate.setMonth(newDate.getMonth() - 12);
    }

    return newDate;
}

export function substractMonth(date: Date): Date {
    const newDate = new Date(date);
    const currentMonth = newDate.getMonth();
    newDate.setMonth(currentMonth - 1);

    if (newDate.getMonth() < 0) {
        newDate.setFullYear(newDate.getFullYear() - 1);
        newDate.setMonth(newDate.getMonth() + 12);
    }

    return newDate;
}

export function createCalendarCell(date: Date, events: CalendarEvent[], workPlans: SortedCalendarArr[]) {
    workPlans = workPlans.map((p) => ({
        userId: p.userId,
        workPlans: p.workPlans.filter(wp => wp.date.getDate() == date.getDate()),
    }));

    return {
        date: date,
        events: events.filter(e => e.date.getDate() == date.getDate()),
        workPlans: workPlans,
        isHoliday: date.getDay() == 0 || date.getDay() == 6
    } as CalendarCell
}

export const substractDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);

    return newDate;
}

export const addDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    return newDate;
}