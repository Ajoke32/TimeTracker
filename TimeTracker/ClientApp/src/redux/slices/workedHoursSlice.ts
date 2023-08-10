import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkedHoursSlice } from '..';
import { WorkedHour, UpdateWorkedHourType, CreateWorkedHourType } from '@redux/types';
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    createSuccessReducerWithoutPayload,
    defaultState
} from "./generic";
import { GetLocalWorkedHour } from '../../utils';

const initialState: WorkedHoursSlice = {
    ...defaultState,
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

        fetchWorkedHours: createPendingReducerWithPayload<WorkedHoursSlice, number>(),
        fetchWorkedHoursSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, WorkedHour[]>(
            (state: WorkedHoursSlice, action: PayloadAction<WorkedHour[]>) => {
                action.payload.forEach((wh, index) => {
                    action.payload[index] = GetLocalWorkedHour(wh)
                })
                state.workedHours = action.payload;
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
    },
});

export const {
    fetchWorkedHours, fetchWorkedHoursSuccess, fetchWorkedHoursFail,
    editWorkedHour, editWorkedHourFail, editWorkedHourSuccess,
    deleteWorkedHour, deleteWorkedHourFail, deleteWorkedHourSuccess,
    createWorkedHour, createWorkedHourFail, createWorkedHourSuccess
} = workedHoursSlice.actions;
export const workedHours = workedHoursSlice.reducer;
