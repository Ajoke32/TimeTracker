import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithoutPayload, createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {DefaultState} from "../intrerfaces";
import {VacationInputType} from "../types";
import {ApproverVacation} from "../types/approverVacationTypes";





interface VacationState extends DefaultState{
  created:boolean,
    createdId?:number
}

const initialState:VacationState = {
    ...defaultState,
    created:false
}

const vacationsSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        createVacation:createPendingReducerWithPayload<typeof initialState,VacationInputType>(),
        createVacationSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state:VacationState,action:PayloadAction<number>)=>{
            state.created=true;
            state.createdId=action.payload
        }),
        createVacationFail:createErrorReducer(),
    },
});


export const vacation = vacationsSlice.reducer;
export const  {createVacation,
    createVacationSuccess,
    createVacationFail,} =  vacationsSlice.actions
