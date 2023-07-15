import {DefaultState} from "../intrerfaces";
import {
    createErrorReducer,
     createPendingReducerWithPayload,
    createSuccessReducerWithoutPayload,
    defaultState
} from "./generic";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApproversAddType} from "../types";


interface ApproversState extends DefaultState{
    approvers:number[]
}

const initialState: ApproversState = {
    ...defaultState,
    approvers:[]
};


const approversSlice = createSlice({
    name: 'approver',
    initialState,
    reducers: {
        addApprovers:createPendingReducerWithPayload<typeof initialState,ApproversAddType>(),
        addApproversSuccess:createSuccessReducerWithoutPayload(),
        addApproversFail:createErrorReducer(),
        setApprovers:(state:ApproversState,action:PayloadAction<number[]>)=>{
            state.approvers=action.payload;
        }
    },
});

export const approvers = approversSlice.reducer;
export const { addApprovers,setApprovers,
    addApproversSuccess,addApproversFail} = approversSlice.actions;
