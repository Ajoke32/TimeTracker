import { User } from './'

export interface UserSliceState {
    user: User | null,
    status: boolean,
    loading: boolean,
    error: string
}