import {User} from "../intrerfaces";
import {Vacation} from "./vacationTypes";

export interface ApproverVacation{
    id:number,
    approver:User[],
    vacation:Vacation,
    isApproved:boolean
}

export interface ApproverVacationUpdate{
    id:number,
    isApproved:boolean,
    vacation?:Vacation
}


