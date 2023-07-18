import {User} from "../intrerfaces";
import {Vacation} from "./vacationTypes";

export interface ApproverVacation{
    id:number,
    approver:User[],
    vacation:Vacation[],
    isApprover:boolean
}

