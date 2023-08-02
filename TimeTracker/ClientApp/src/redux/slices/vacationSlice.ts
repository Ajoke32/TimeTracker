import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithoutPayload, createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {VacationState} from "../intrerfaces";
import {Vacation, VacationChangeType, VacationInputType} from "../types";


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
        fetchUserVacationsFail:createErrorReducer(),

        changeVacationState:createPendingReducerWithPayload<typeof initialState,VacationChangeType>(),
        changeVacationSateSuccess:createSuccessReducerWithPayload<typeof initialState,Vacation>
        ((state:VacationState,action:PayloadAction<Vacation>)=>{
            const updated = action.payload;
           state.vacations = state.vacations.map(v=>{
                if(v.id===updated.id){
                    v.vacationState=updated.vacationState;
                }
               return v;
           });
        }),
        changeVacationStateFail:createErrorReducer(),

        updateVacation:createPendingReducerWithPayload<typeof initialState,Vacation>(),
        updateVacationSuccess:createSuccessReducerWithPayload<typeof initialState,Vacation>
        ((state, action)=>{
            const upd = action.payload;
            state.vacations=state.vacations.map(v=>{
                if(v.id===upd.id){
                    v=upd;
                }
                return v;
            });
        }),
        updateVacationFail:createErrorReducer(),

        deleteVacation:createPendingReducerWithPayload<typeof initialState,Vacation>(),
        deleteVacationSuccess:createSuccessReducerWithPayload<typeof initialState,Vacation>
        ((state,action)=>{
            state.vacations=state.vacations.filter(v=>v.id!==action.payload.id);
        }),
        deleteVacationFail:createErrorReducer()
    }
});


export const vacation = vacationsSlice.reducer;

export const  {createVacation,
    createVacationSuccess,
    createVacationFail,updateVacationStateFail,
    updateVacationStateSuccess,
    updateVacationState,fetchUserVacationsSuccess
    ,fetchUserVacationsFail
    ,fetchUserVacations,changeVacationState
    ,changeVacationStateFail
    ,changeVacationSateSuccess,
    updateVacationSuccess,updateVacationFail
    ,updateVacation,deleteVacationSuccess,deleteVacationFail,deleteVacation} =  vacationsSlice.actions;