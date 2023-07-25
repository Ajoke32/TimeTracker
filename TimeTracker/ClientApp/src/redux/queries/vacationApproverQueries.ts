import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproverVacationUpdate, VacationApproverInput} from "../types";



export function UpdateApproverVacationState(id:number,state:boolean,approverId:number,message?:string){
    return AjaxQuery<QueryStructure<{ approverVacationMutation: { updateState:ApproverVacationUpdate}}>>(
        'mutation UpdateState($state:Boolean!,$vacationId:Int!,$approverId:Int!,$message:String){approverVacationMutation{updateState(state:$state,vacationId:$vacationId,approverId:$approverId,message:$message){id,vacationId,isApproved}}}',
        {vacationId:id,state:state,approverId:approverId,message:message}
    )
}

export function CreateApproverVacation(approverVacation:VacationApproverInput){

    return AjaxQuery<QueryStructure<{ approverVacationMutation: { createApproverVacation:VacationApproverInput}}>>(
        'mutation CreateApproverVacation($approverVacation:ApproverVacationInputType!){approverVacationMutation{createApproverVacation(approverVacation:$approverVacation){id,userId}}}',
        {approverVacation:approverVacation}
    )
}

export function UpdateApproverVacations(input:VacationApproverInput){

    return AjaxQuery<QueryStructure<any>>(
        'mutation UpdateApproversVacations($av:ApproverVacationInputType!){approverVacationMutation{updateApproversVacations(approverVacation:$av)}}',
        {av:input}
    )
}