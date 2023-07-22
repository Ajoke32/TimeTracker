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
<<<<<<< HEAD
    user:User|null,
    vacationDays?:number
=======
    user: User | null,
>>>>>>> production
}

export interface UsersSliceState extends DefaultState {
    users: User[],
}