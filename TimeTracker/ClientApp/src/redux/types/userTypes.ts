export interface UserLoginType {
    email: string,
    password: string
}

export interface UserType {
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
}

export interface UserAddType extends UserType {
    vacationDays: number,
}

export interface UserEditType extends UserType {
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