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





interface VacationState extends DefaultState{}

const initialState:VacationState = {
    ...defaultState,
}

const vacationsSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        createVacation:createPendingReducerWithPayload<typeof initialState,VacationInputType>(),
        createVacationSuccess:createSuccessReducerWithoutPayload(),
        createVacationFail:createErrorReducer(),
    },
});


export const vacation = vacationsSlice.reducer;
export const  {createVacation,
    createVacationSuccess,
    createVacationFail,} =  vacationsSlice.actions
