import { User } from './'
import { ApproverVacation, Vacation, WorkedHour } from '@redux/types';

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

export interface UsersSliceState extends DefaultState {
    users: User[],
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

export interface VacationApproverState extends DefaultState {
    vacationRequests: ApproverVacation[],
    updated: boolean,
    approverVacation:ApproverVacation|null,
    deleted:boolean
}

export interface VacationState extends DefaultState {
    created: boolean,
    createdId?: number,
    vacations: Vacation[],
    vacation:Vacation|null,
    updated:Vacation|null
}

export interface WorkedHoursSlice extends DefaultState {
    workedHours: WorkedHour[]
}