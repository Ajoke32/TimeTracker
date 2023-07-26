import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproverVacationUpdate, VacationApproverInput} from "../types";



export function UpdateApproverVacationState(record:ApproverVacationUpdate){
    return AjaxQuery<QueryStructure<{ approverVacationMutation: { updateState:ApproverVacationUpdate}}>>(
        'mutation UpdateState($approverVacation:ApproverVacationUpdateType!){approverVacationMutation{updateState(approverVacation:$approverVacation){id,vacationId,isApproved}}}',
        {approverVacation:record}
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