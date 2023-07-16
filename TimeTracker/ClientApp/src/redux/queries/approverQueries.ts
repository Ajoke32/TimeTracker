
import { ReadCookie } from "../../utils";
import { AjaxQuery } from "./query";
import { QueryStructure } from "../intrerfaces";
import { ApproversAddType } from "../types";

export function AddApproversQuery(data: ApproversAddType) {
    const token = ReadCookie('user');
    const { approvers, userId } = data;

    return AjaxQuery<QueryStructure<{ userMutation: { create: boolean } }>>(
        "mutation AddApprovers($userId:Int!,$approvers:[Int!]){ approveMutation{create(userSenderId:$userId,approvers:$approvers)}}",
        {
            approvers: approvers,
            userId: userId
        },
        token
    )
}

export function UpdateApproveState(state:boolean,id:number){

    return AjaxQuery<QueryStructure<any>>(
        'mutation UpdateApproveState($state:Boolean!,$id:Int!){approveMutation{updateState(state:$state,id:$id){isApproved,id}}}',
        {state:state,id:id},
    )
}