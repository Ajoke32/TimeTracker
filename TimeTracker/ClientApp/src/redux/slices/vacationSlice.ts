import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithoutPayload, createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {DefaultState, User} from "../intrerfaces";
import {UserApprover, VacationInputType} from "../types";
import {ApproverVacation} from "../types/ApproverVacationTypes";





interface VacationState extends DefaultState{
    requests:ApproverVacation[]
}

const initialState:VacationState = {
    ...defaultState,
    requests:[]
}

const vacationsSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        createVacation:createPendingReducerWithPayload<typeof initialState,VacationInputType>(),
        createVacationSuccess:createSuccessReducerWithoutPayload(),
        createVacationFail:createErrorReducer(),

        fetchRequests:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchRequestsSuccess:createSuccessReducerWithPayload<typeof initialState,ApproverVacation[]>((state:VacationState,action:PayloadAction<ApproverVacation[]>)=>{
            state.requests=action.payload;
        }),
        fetchRequestsFail:createErrorReducer()
    },
});


export const vacation = vacationsSlice.reducer;
export const  {createVacation,
    createVacationSuccess,
    createVacationFail,
fetchRequests,fetchRequestsSuccess,
    fetchRequestsFail} =  vacationsSlice.actions
