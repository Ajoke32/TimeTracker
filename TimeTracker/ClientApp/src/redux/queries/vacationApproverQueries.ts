import {AjaxQuery} from "./query";
import {ApproverVacation, Vacation, VacationApproverInput} from "../types";



export function UpdateApproverVacationState(id:number,state:boolean,approverId:number,message?:string){
    return AjaxQuery<{ approverVacationMutation: { updateState:ApproverVacation}}>(
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
                    user{
                      firstName,
                      lastName,
                      email
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

    return AjaxQuery<{ approverVacationMutation: { createApproverVacation:VacationApproverInput}}>(
        'mutation CreateApproverVacation($approverVacation:ApproverVacationInputType!){approverVacationMutation{createApproverVacation(approverVacation:$approverVacation){id,userId}}}',
        {approverVacation:approverVacation}
    )
}

export function UpdateApproverVacations(input:VacationApproverInput){

    return AjaxQuery<any>(
        'mutation UpdateApproversVacations($av:ApproverVacationInputType!){approverVacationMutation{updateApproversVacations(approverVacation:$av)}}',
        {av:input}
    )
}

export function DeleteApproverVacationByVacationId(id:number){
    return AjaxQuery<{approverVacationMutation:{deleteByVacationId:ApproverVacation}}>(
        `mutation DeleteByVacationId($id:Int!){approverVacationMutation{deleteByVacationId(id:$id)}}`,
        {id:id}
    )
}

export function FetchApproverVacationById(id:number){
    return AjaxQuery<{approverVacationQuery:{approverVacation:ApproverVacation}}>(
        'query FetchById($id:Int!){approverVacationQuery{approverVacation(id:$id){isApproved,isDeleted,id,vacation{id,vacationState,startDate,endDate,user{firstName,lastName,email,vacationDays}}}}}',
        {id:id}
    )
}