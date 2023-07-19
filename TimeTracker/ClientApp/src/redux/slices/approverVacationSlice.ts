import {DefaultState} from "../intrerfaces";
import {
    createErrorReducer,
    createPendingReducerWithPayload, createSuccessReducerWithoutPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {createSlice,  PayloadAction} from "@reduxjs/toolkit";
import {ApproverVacation, ApproverVacationUpdate, VacationApproverInput} from "../types/approverVacationTypes";

interface VacationApproverState extends DefaultState{
    vacationRequests:ApproverVacation[]
}

const initialState:VacationApproverState = {
    ...defaultState,
    vacationRequests:[]
}

const approverVacationsSlice = createSlice({
    name: 'approverVacation',
    initialState,
    reducers: {
        updateApproverVacationState:createPendingReducerWithPayload<typeof initialState,ApproverVacationUpdate>(),
        updateApproverVacationStateStateSuccess:(state:VacationApproverState,action:PayloadAction<ApproverVacationUpdate>)=>{
            state.loading=false;
            state.vacationRequests.map(a=>{
                if(a.vacation.id===action.payload.vacation?.id){
                    a.isApproved=action.payload.isApproved;
                }
                return a;
            })
        },
        updateApproverVacationStateStateFail:createErrorReducer(),

        fetchRequests:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchRequestsSuccess:createSuccessReducerWithPayload<typeof initialState,ApproverVacation[]>(
            (state:VacationApproverState,action:PayloadAction<ApproverVacation[]>)=>{
            state.vacationRequests=action.payload;
            state.loading=false;
        }),
        fetchRequestsFail:createErrorReducer(),

        createApproverVacation:createPendingReducerWithPayload<typeof initialState,VacationApproverInput>(),
        createApproverVacationSuccess:createSuccessReducerWithoutPayload(),
        createApproverVacationFail:createErrorReducer()
    },
});


export const approverVacations = approverVacationsSlice.reducer;
export const  {updateApproverVacationState,
    updateApproverVacationStateStateSuccess,
    updateApproverVacationStateStateFail,
fetchRequests,fetchRequestsFail,
    fetchRequestsSuccess,
createApproverVacationSuccess,createApproverVacationFail,createApproverVacation} =  approverVacationsSlice.actions