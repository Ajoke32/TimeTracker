import {User} from "../intrerfaces";


export interface Vacation{
    startDate:Date,
    endDate:Date,
    message?:string
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
