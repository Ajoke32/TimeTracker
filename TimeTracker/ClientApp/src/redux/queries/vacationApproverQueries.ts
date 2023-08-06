import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproverVacation, Vacation, VacationApproverInput} from "../types";



export function UpdateApproverVacationState(id:number,state:boolean,approverId:number,message?:string){
    return AjaxQuery<QueryStructure<{ approverVacationMutation: { updateState:ApproverVacation}}>>(
        `mutation UpdateState(
              $state: Boolean!
              $vacationId: Int!
              $approverId: Int!
              $message: String
            ) {
              approverVacationMutation {
                updateState(
                  state: $state
                  vacationId: $vacationId
                  approverId: $approverId
                  message: $message
                ) {
                  id
                  vacationId
                  isApproved,
                  vacation{
                    vacationState,
                    message
                    user{
                      firstName,
                      lastName,
                      email,
                      vacationDays
                     }
                  }
                }
              }
            }
`,
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

export function DeleteApproverVacationByVacationId(id:number){
    return AjaxQuery<QueryStructure<{approverVacationMutation:{deleteByVacationId:ApproverVacation}}>>(
        `mutation DeleteByVacationId($id:Int!){approverVacationMutation{deleteByVacationId(id:$id)}}`,
        {id:id}
    )
}

export function FetchApproverVacationById(id:number){
    return AjaxQuery<QueryStructure<{approverVacationQuery:{approverVacation:ApproverVacation}}>>(
        'query FetchById($id:Int!){approverVacationQuery{approverVacation(id:$id){isApproved,isDeleted,id,vacation{id,vacationState,startDate,message,endDate,user{firstName,lastName,email,vacationDays}}}}}',
        {id:id}
    )
}