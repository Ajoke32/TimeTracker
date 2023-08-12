import {Vacation} from "../types";
import {PagingExtraInfo} from "@redux/types/filterTypes.ts";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    workType: number;
    permissions: number;
    vacationDays: number;
    hoursPerMonth: number;
    vacations?:Vacation[]
}

