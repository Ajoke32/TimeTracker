import { User } from './'

export interface AuthSliceState {
    user: User | null,
    status: boolean,
    loading: boolean,
    error: string
}

export interface UserSliceState {
    loading: boolean,
    error: string,
}