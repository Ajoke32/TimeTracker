import {AjaxQuery} from "./query";
import {QueryStructure} from "../intrerfaces";
import {ApproverVacationUpdate} from "../types/approverVacationTypes";



export function UpdateApproverVacationState(id:number,state:boolean){
    return AjaxQuery<QueryStructure<{ approverVacationMutation: { updateState:ApproverVacationUpdate}}>>(
        'mutation UpdateApproverVacationState($state:Boolean!,$id:Int!)' +
        '{approverVacationMutation{updateStater(state:$state,vacationId:$id){id,isApproved,vacation{id}}}}',
        {id:id,state:state}
    )
}