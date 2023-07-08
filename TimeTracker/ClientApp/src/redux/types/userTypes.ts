export type UserLoginType = {
    email: string,
    password: string
}

export type UserAddType = {
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
    vacationDays: number,
}