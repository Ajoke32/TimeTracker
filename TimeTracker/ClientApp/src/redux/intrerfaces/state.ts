import { User } from './'

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
    vacationDays?:number
}

export interface UsersSliceState extends DefaultState {
    users: User[],
}

export interface TimerSliceState extends DefaultState{
    startedAt: number | null;
    pausedAt: number | null;
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
}