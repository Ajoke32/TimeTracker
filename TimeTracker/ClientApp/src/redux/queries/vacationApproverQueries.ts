import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproverVacation, ApproverVacationUpdate, VacationApproverInput} from "../types";



export function UpdateApproverVacationState(ids:number[],state:boolean,approverId:number){
    return AjaxQuery<QueryStructure<{ approverVacationMutation: { updateState:ApproverVacationUpdate[]}}>>(
        'mutation UpdateState($approverId:Int!,$vacations:[Int!]!,$state:Boolean!){approverVacationMutation{updateState(approverId:$approverId,vacations:$vacations,state:$state){id,isApproved,vacationId}}}',
        {vacations:ids,state:state,approverId:approverId}
    )
}

export function CreateApproverVacation(approverVacation:VacationApproverInput){

    return AjaxQuery<QueryStructure<{ approverVacationMutation: { createApproverVacation:VacationApproverInput}}>>(
        'mutation CreateApproverVacation($approverVacation:ApproverVacationInputType!){approverVacationMutation{createApproverVacation(approverVacation:$approverVacation){id,userId}}}',
        {approverVacation:approverVacation}
    )
}

export function UpdateApproverVacations(input:VacationApproverInput){

    return AjaxQuery<QueryStructure<{}>>(
        'mutation UpdateApproversVacations($av:ApproverVacationInputType!){approverVacationMutation{updateApproversVacations(approverVacation:$av)}}',
        {av:input}
    )
}