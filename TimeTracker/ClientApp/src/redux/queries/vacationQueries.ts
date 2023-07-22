import { VacationInputType} from "../types";
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

export function UpdateVacationState(ids:number[]){

    return AjaxQuery<QueryStructure<{ vacationMutation:{updateState:{id:number}  } }>>(
        'mutation UpdateVacationState($id:Int!){vacationMutation{updateState(id:$id){id}}}',
        {vacations:ids},
    )
}