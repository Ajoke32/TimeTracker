import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproverVacationUpdate, VacationApproverInput} from "../types/approverVacationTypes";



export function UpdateApproverVacationState(id:number,state:boolean,approverId:number){
    return AjaxQuery<QueryStructure<{ approverVacationMutation: { updateState:ApproverVacationUpdate}}>>(
        'mutation UpdateApproverVacationState($state:Boolean!,$id:Int!,$userId:Int!)' +
        '{approverVacationMutation{updateState(state:$state,vacationId:$id,approverId:$userId){id,isApproved,vacation{id}}}}',
        {id:id,state:state,userId:approverId}
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