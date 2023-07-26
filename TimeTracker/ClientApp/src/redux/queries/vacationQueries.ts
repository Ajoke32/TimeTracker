import {Vacation, VacationInputType} from "../types";
import {QueryStructure} from "../intrerfaces";
import {AjaxQuery} from "./query";
import {ReadCookie} from "../../utils";
import {ApproverVacation} from "../types";



export function AddVacationQuery(vacation:VacationInputType) {

    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ vacationMutation: { create: {id:number} } }>>(
        'mutation CreateVacations($vacation:VacationInputType!){vacationMutation{create(vacation:$vacation){id,userId}}}',
        { vacation:vacation},
        token
    )
}

export function FetchVacationsRequest(id:number){
    return AjaxQuery<QueryStructure<{ approverVacationQuery: { requests:ApproverVacation[]}}>>(
        'query GetRequests($userId:Int!){approverVacationQuery{requests(userId:$userId){id,isApproved,vacation{vacationState,id,endDate,message,startDate,user{firstName,lastName,email}}}}}',
        {userId:id}
    )
}

export function UpdateVacationState(id:number){

    return AjaxQuery<QueryStructure<{ vacationMutation:{updateState:{id:number}  } }>>(
        'mutation UpdateState($id:Int!){vacationMutation{updateState(vacationId:$id)}}',
        {id:id},
    )
}

export function FetchUserVacations(userId:number){

    return AjaxQuery<QueryStructure<{ vacationQuery:{userVacations:Vacation[]} }>>(
        'query GetUserVacations($id:Int!){vacationQuery{userVacations(userId:$id){vacationState,endDate,startDate,message}}}',
        {id:userId}
    )
}