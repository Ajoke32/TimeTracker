import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithoutPayload, createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {VacationState} from "../intrerfaces";
import {Vacation, VacationInputType} from "../types";


const initialState:VacationState = {
    ...defaultState,
    created:false,
    vacations:[]
}

const vacationsSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        createVacation:createPendingReducerWithPayload<typeof initialState,VacationInputType>
        ((state:VacationState)=>{
            state.created=false;
        }),
        createVacationSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state:VacationState,action:PayloadAction<number>)=>{
            state.created=true;
            state.createdId=action.payload
        }),
        createVacationFail:createErrorReducer(),

        updateVacationState:createPendingReducerWithPayload<typeof initialState,number>(),
        updateVacationStateSuccess:createSuccessReducerWithoutPayload(),
        updateVacationStateFail:createErrorReducer(),

        fetchUserVacations:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchUserVacationsSuccess:createSuccessReducerWithPayload<typeof initialState,Vacation[]>
        ((state:VacationState,action:PayloadAction<Vacation[]>)=>{
            state.vacations=action.payload;
        }),
        fetchUserVacationsFail:createErrorReducer()
    }
});


export const vacation = vacationsSlice.reducer;

export const  {createVacation,
    createVacationSuccess,
    createVacationFail,updateVacationStateFail,
    updateVacationStateSuccess,
    updateVacationState,fetchUserVacationsSuccess
    ,fetchUserVacationsFail
    ,fetchUserVacations} =  vacationsSlice.actions;