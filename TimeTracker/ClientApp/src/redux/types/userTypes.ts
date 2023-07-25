export type UserLoginType = {
    email: string,
    password: string
}

export interface UserAddType {
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
    vacationDays: number,
}

export interface UserEditType extends UserAddType {
    id: number
}

export interface FetchUserType {
    userId: number
}

export interface FetchUsersType extends FetchUserType {
    take: number,
    skip: number,
    activated: Boolean,
}