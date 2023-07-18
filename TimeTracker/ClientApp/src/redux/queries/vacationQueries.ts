import {UserApprover, VacationInputType} from "../types";
import {QueryStructure} from "../intrerfaces";
import {AjaxQuery} from "./query";
import {ReadCookie} from "../../utils";
import {ApproverVacation} from "../types/ApproverVacationTypes";


export function AddVacationQuery(vacation:VacationInputType) {

    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ userMutation: { create: boolean } }>>(
        'mutation CreateVacations($vacation:VacationInputType!){vacationMutation{create(vacation:$vacation){id,userId}}}',
        { vacation:vacation},
        token
    )
}

export function FetchVacationsRequest(id:number){
    return AjaxQuery<QueryStructure<{ approverVacationQuery: { requests:ApproverVacation[]}}>>(
        'query GetRequests($userId:Int!){approverVacationQuery{requests(userId:$userId){id,isApproved,vacation{vacationState,id,endDate,startDate,user{firstName,lastName,email}}}}}',
        {userId:id}
    )
}