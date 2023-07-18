import {UserApprover, VacationInputType} from "../types";
import {QueryStructure} from "../intrerfaces";
import {AjaxQuery} from "./query";
import {ReadCookie} from "../../utils";


export function AddVacationQuery(vacation:VacationInputType) {

    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ userMutation: { create: boolean } }>>(
        'mutation CreateVacations($vacation:VacationInputType!){vacationMutation{create(vacation:$vacation){id,userId}}}',
        { vacation:vacation},
        token
    )
}

export function FetchVacationsRequest(id:number){
    return AjaxQuery<QueryStructure<{ userQuery: { user:{senders:UserApprover[]} } }>>(
        'query GetUserRequest($userId: Int!) {userQuery {user(id: $userId, include: "Senders.User.Vacations") {senders{user{firstName,lastName,email,id,vacations{startDate,endDate,message}}}}}}',
        {userId:id}
    )
}