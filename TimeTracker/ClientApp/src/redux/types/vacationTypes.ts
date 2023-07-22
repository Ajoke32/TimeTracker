import {User} from "../intrerfaces";


export interface Vacation{
    id:number,
    startDate:Date,
    endDate:Date,
    message?:string,
    user:User,
    vacationState:null|boolean
}

export interface VacationInputType{
    userId:number,
    startDate:Date,
    endDate:Date,
    message?:string
}

export interface UserApprover{
    id:number,
    user:User,
    approver:User,
    isApproved:boolean
}
