import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkedHoursSlice } from '..';
import { WorkedHour, UpdateWorkedHourType, CreateWorkedHourType } from '@redux/types';
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import { GetLocalWorkedHour } from '../../utils';
import {basicPagingReducers, defaultPagingState, PagingEntityType, PagingInputType} from "@redux/types/filterTypes.ts";

export interface WorkedFetchType extends PagingInputType{
    userId:number
}

const initialState: WorkedHoursSlice = {
    ...defaultState,
    ...{...defaultPagingState,take:4,perPage:4},
    workedHours: []
};

const workedHoursSlice = createSlice({
    name: 'workedHours',
    initialState,
    reducers: {
        createWorkedHour: createPendingReducerWithPayload<WorkedHoursSlice, CreateWorkedHourType>(),
        createWorkedHourSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, WorkedHour>(
            (state: WorkedHoursSlice, action: PayloadAction<WorkedHour>) => {
                state.workedHours = [...state.workedHours, GetLocalWorkedHour(action.payload)]
            }
        ),
        createWorkedHourFail: createErrorReducer(),

        fetchWorkedHours: createPendingReducerWithPayload<WorkedHoursSlice, WorkedFetchType>(),
        fetchWorkedHoursSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, PagingEntityType<WorkedHour>>(
            (state, action) => {
                action.payload.entities.forEach((wh, index) => {
                    action.payload.entities[index] = GetLocalWorkedHour(wh)
                })
                state.workedHours = action.payload.entities;
                if(action.payload.extensions){
                    state.extensions=action.payload.extensions;
                }
            }),
        fetchWorkedHoursFail: createErrorReducer(),

        editWorkedHour: createPendingReducerWithPayload<WorkedHoursSlice, UpdateWorkedHourType>(),
        editWorkedHourSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, WorkedHour>(
            (state: WorkedHoursSlice, action: PayloadAction<WorkedHour>) => {
                state.workedHours.forEach((wh, index) => {
                    if (wh.id == action.payload.id)
                        state.workedHours[index] = GetLocalWorkedHour(action.payload);
                })
            }
        ),
        editWorkedHourFail: createErrorReducer(),

        deleteWorkedHour: createPendingReducerWithPayload<WorkedHoursSlice, number>(),
        deleteWorkedHourSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, number>(
            (state: WorkedHoursSlice, action: PayloadAction<number>) => {
                state.workedHours = state.workedHours.filter(wh => wh.id != action.payload)
            }),
        deleteWorkedHourFail: createErrorReducer(),
        ...basicPagingReducers
    },
});

export const {
    fetchWorkedHours, fetchWorkedHoursSuccess, fetchWorkedHoursFail,
    editWorkedHour, editWorkedHourFail, editWorkedHourSuccess,
    deleteWorkedHour, deleteWorkedHourFail, deleteWorkedHourSuccess,
    createWorkedHour, createWorkedHourFail, createWorkedHourSuccess,
    setTake:setWorkedHoursTake,setSkip:setWorkedHourSkip
} = workedHoursSlice.actions;
export const workedHours = workedHoursSlice.reducer;
