import { CalendarCell, CalendarEvent, WorkPlan } from '@redux/types/calendarTypes';
import { User } from './'
import {ApproverVacation, Vacation, WorkedHour, WorkedHoursStatistic} from '@redux/types';
import {
    FiltersType,
    OrderingPagingFilterType,
    PagingExtraInfo,
    PagingType,
    PagingWithExtraInfo
} from "@redux/types/filterTypes.ts";

export interface DefaultState {
    loading: boolean,
    error: string | null,
    message: string | null
}

export interface AuthSliceState extends DefaultState {
    user: User | null,
    status: boolean,
}

export interface UserSliceState extends DefaultState {
    user: User | null,
    vacationDays?: number
}

export interface UsersSliceState extends DefaultState,OrderingPagingFilterType {
    users: User[],
    count:number,
}

export interface TimerSliceState extends DefaultState {
    startedAt: number | null;
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
}

export interface ApproversState extends DefaultState {
    userApprovers: number[],
    approversList: User[]
}

export interface VacationApproverState extends DefaultState,PagingWithExtraInfo,FiltersType {
    vacationRequests: ApproverVacation[],
    updated: boolean,
    approverVacation:ApproverVacation|null,
    deleted:boolean
}

export interface VacationState extends DefaultState,FiltersType,PagingWithExtraInfo {
    created: boolean,
    createdId?: number,
    vacations: Vacation[],
    vacation:Vacation|null,
    updated:Vacation|null
}

export interface WorkedHoursSlice extends DefaultState,PagingType,PagingExtraInfo {
    workedHours: WorkedHour[],
    hoursToWork?:WorkedHoursStatistic
}

export interface CalendarSlice extends DefaultState {
    events: FormattedCalendarArr<CalendarEvent>,
    workPlans: FormattedCalendarArr<WorkPlan>,
    currentDate: Date
}

export interface FormattedCalendarArr<T> {
    previousMonth: T[],
    currentMonth: T[],
    nextMonth: T[]
}