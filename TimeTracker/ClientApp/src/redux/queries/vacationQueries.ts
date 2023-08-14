import {Vacation, VacationChangeType, VacationInputType} from "../types";
import {AjaxQuery} from "./query";
import {ReadCookie} from "../../utils";
import {ApproverVacation} from "../types";
import moment from "moment";



export function AddVacationQuery(vacation:VacationInputType) {

    const token = ReadCookie('user');

    return AjaxQuery<{ vacationMutation: { create: {id:number} } }>(
        'mutation CreateVacations($vacation:VacationInputType!){vacationMutation{create(vacation:$vacation){id,userId}}}',
        { vacation:vacation},
        token
    )
}

export function FetchVacationsRequest(id:number){
    return AjaxQuery<{ approverVacationQuery: { requests:ApproverVacation[]}}>(
        'query GetRequests($userId:Int!){approverVacationQuery{requests(userId:$userId){id,isApproved,isDeleted,vacation{vacationState,id,endDate,message,startDate,user{firstName,lastName,email}}}}}',
        {userId:id}
    )
}

export function UpdateVacationState(id:number){

    return AjaxQuery<{ vacationMutation:{updateState:{id:number}  } }>(
        'mutation UpdateState($id:Int!){vacationMutation{updateState(vacationId:$id){id}}}',
        {id:id},
    )
}

export function FetchUserVacations(userId:number){

    return AjaxQuery<{ vacationQuery:{userVacations:Vacation[]} }>(
        'query GetUserVacations($id:Int!){vacationQuery{userVacations(userId:$id){id,vacationState,deletedAt,isDeleted,haveAnswer,endDate,startDate,message}}}',
        {id:userId}
    )
}

export function ChangeVacationState(vac:VacationChangeType){
    return AjaxQuery<{ vacationMutation:{changeState:Vacation} }>(
        'mutation ChangeState($id:Int!,$state:VacationState!){vacationMutation{changeState(vacationId:$id,state:$state){id,vacationState}}}',
        {id:vac.id,state:vac.state}
    )
}

export function UpdateVacation(vacation:Vacation){
    return AjaxQuery<{ vacationMutation:{update:Vacation} }>(
        'mutation UpdateVacation($vacation:VacationInputType!){vacationMutation{update(vacation:$vacation){id,startDate,endDate,vacationState}}}',
        {vacation:{...vacation,
                startDate:moment(vacation.startDate).format("YYYY-MM-DD"),
                endDate:moment(vacation.endDate).format("YYYY-MM-DD")}}
    )
}

export function DeleteVacation(vacation:Vacation){
    return AjaxQuery<{ vacationMutation:{delete:Vacation} }>(
        'mutation ArchiveVacation($vacation:VacationInputType!){vacationMutation{delete(vacation:$vacation){id}}}',
        {vacation:vacation}
    )
}

export function FetchVacationById(id:number){
    return AjaxQuery<{ vacationQuery:{vacation:Vacation} }>(
        'query VacationById($id:Int!){vacationQuery{vacation(id:$id){id,startDate,endDate,vacationState,message,user{firstName,lastName,email,vacationDays}}}}',
        {id:id}
    )
}