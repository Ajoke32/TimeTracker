import {DefaultState} from "../intrerfaces";
import {
    createErrorReducer,
    createPendingReducerWithPayload, createSuccessReducerWithoutPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {createSlice,  PayloadAction} from "@reduxjs/toolkit";
import {
    ApproverVacation, ApproverVacationUpdate,
    VacationApproverInput
} from "../types";

interface VacationApproverState extends DefaultState{
    vacationRequests:ApproverVacation[],
    updated:boolean
}

const initialState:VacationApproverState = {
    ...defaultState,
    vacationRequests:[],
    updated:false
}

const approverVacationsSlice = createSlice({
    name: 'approverVacation',
    initialState,
    reducers: {
        updateApproverVacationState:createPendingReducerWithPayload<typeof initialState,ApproverVacationUpdate>
        ((state:VacationApproverState)=>{
            state.updated=false;
        }),
        updateApproverVacationStateStateSuccess:(state:VacationApproverState,action:PayloadAction<ApproverVacationUpdate>)=>{
            state.loading=false;
            state.vacationRequests.map(a=>{
                if(a.vacation.id==action.payload.vacationId){
                    a.isApproved = action.payload.isApproved
                }
                return a;
            });
            state.updated=true;
        },
        updateApproverVacationStateStateFail:createErrorReducer(),

        fetchRequests:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchRequestsSuccess:createSuccessReducerWithPayload<typeof initialState,ApproverVacation[]>(
            (state:VacationApproverState,action:PayloadAction<ApproverVacation[]>)=>{
            state.vacationRequests=action.payload;
            state.loading=false;
        }),
        fetchRequestsFail:createErrorReducer(),

        /*можливо потрібно буде створити просто один запис*/
        /*createApproverVacation:createPendingReducerWithPayload<typeof initialState,VacationApproverInput>(),
        createApproverVacationSuccess:createSuccessReducerWithoutPayload(),
        createApproverVacationFail:createErrorReducer()*/

        /*Оновлення не запису, а таблиці VacationApprovers*/
        updateApproversVacations:createPendingReducerWithPayload<typeof initialState,VacationApproverInput>(),
        updateApproversVacationsSuccess:createSuccessReducerWithoutPayload(),
        updateApproversVacationsFail:createErrorReducer()
    },
});


export const approverVacations = approverVacationsSlice.reducer;
export const  {updateApproverVacationState,
    updateApproverVacationStateStateSuccess,
    updateApproverVacationStateStateFail,
fetchRequests,fetchRequestsFail,
    fetchRequestsSuccess,updateApproversVacationsSuccess,
    updateApproversVacationsFail,updateApproversVacations} =  approverVacationsSlice.actions