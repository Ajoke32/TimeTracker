import { User } from './'

export interface DefaultState {
    loading: boolean,
    error: string
}

export interface AuthSliceState extends DefaultState {
    user: User | null,
    status: boolean,
}

export interface UserSliceState extends DefaultState {
    userId:number|null
}

export interface UsersSliceState extends DefaultState {
    users: User[],
}