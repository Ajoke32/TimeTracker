import {User} from "../intrerfaces";
import {Vacation} from "./vacationTypes";

export interface ApproverVacation{
    id:number,
    approver:User[],
    vacation:Vacation,
    isApproved?:boolean|null
}

export interface ApproverVacationUpdate{
    id:number,
    isApproved:boolean,
    vacation?:Vacation,
    approverId:number
}



export interface VacationApproverInput{
    vacationId:number,
    userId:number,
}


