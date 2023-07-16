
import {ReadCookie} from "../../utils";
import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproversAddType} from "../types";

export function AddApproversQuery(addType:ApproversAddType) {
    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ userMutation: { create: boolean } }>>(
        "mutation AddApprovers($userId:Int!,$approvers:[Int!]){ approveMutation{create(userSenderId:$userId,approvers:$approvers)}}",
        { approvers: addType.approvers,userId:addType.userId },
        token
    )
}