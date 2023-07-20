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
    vacationId:number
}

export interface ApproverVacationUpdateMany{
    id:number[],
    isApproved:boolean,
    approverId:number
}



export interface VacationApproverInput{
    vacationId:number,
    userId:number,
}


