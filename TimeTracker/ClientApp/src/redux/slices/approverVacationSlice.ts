import { VacationApproverState } from "../intrerfaces";
import {
    createErrorReducer,
    createPendingReducerWithPayload, createSuccessReducerWithoutPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {createSlice,  PayloadAction} from "@reduxjs/toolkit";
import {
    ApproverVacation, ApproverVacationUpdate, Vacation,
    VacationApproverInput
} from "../types";


const initialState:VacationApproverState = {
    ...defaultState,
    vacationRequests:[],
    updated:false,
    approverVacation:null,
    deleted:false,
}

const approverVacationsSlice = createSlice({
    name: 'approverVacation',
    initialState,
    reducers: {
        updateApproverVacationState:createPendingReducerWithPayload<typeof initialState,ApproverVacationUpdate>
        ((state:VacationApproverState)=>{
            state.updated=false;
        }),
        updateApproverVacationStateStateSuccess:(state:VacationApproverState,action:PayloadAction<ApproverVacation>)=>{
            state.loading=false;
            state.approverVacation=action.payload;
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
        updateApproversVacationsFail:createErrorReducer(),

        deleteByVacationId:createPendingReducerWithPayload<typeof initialState,number>
        ((state)=>{
            state.deleted=false;
        }),
        deleteByVacationIdSuccess:createSuccessReducerWithPayload<typeof initialState,ApproverVacation>
        ((state)=>{
            state.deleted=true;
        }),
        deleteByVacationIdFail:createErrorReducer(),

        fetchApproverVacationById:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchApproverVacationByIdSuccess:createSuccessReducerWithPayload<typeof initialState,ApproverVacation>
        ((state, action)=>{
            state.approverVacation=action.payload;
        }),
        fetchApproverVacationByIdFail:createErrorReducer()
    },
});


export const approverVacations = approverVacationsSlice.reducer;
export const  {updateApproverVacationState,
    updateApproverVacationStateStateSuccess,
    updateApproverVacationStateStateFail,
fetchRequests,fetchRequestsFail,
    fetchRequestsSuccess,updateApproversVacationsSuccess,
    updateApproversVacationsFail,updateApproversVacations
    ,deleteByVacationIdSuccess,deleteByVacationIdFail
    ,deleteByVacationId,fetchApproverVacationById,
    fetchApproverVacationByIdSuccess,fetchApproverVacationByIdFail} =  approverVacationsSlice.actions