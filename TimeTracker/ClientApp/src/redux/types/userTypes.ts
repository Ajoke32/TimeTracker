import {FiltersType, OrderingType, PagingExtraInfo, WhereFilter} from "@redux/types/filterTypes.ts";


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

export interface FetchUsersType extends FetchUserType,FiltersType,OrderingType{
    take: number,
    skip: number,
    group:WhereFilter[]
}

export const userFields = ['FirstName','LastName',"Email","HoursPerMonth","WorkingHours","VacationDays"]
