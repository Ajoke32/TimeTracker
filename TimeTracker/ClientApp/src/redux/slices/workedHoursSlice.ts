import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkedHoursSlice } from '..';
import { WorkedHour, UpdateWorkedHoursType, SetWorkedHoursType } from '@redux/types';
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    createSuccessReducerWithoutPayload,
    defaultState
} from "./generic";

const initialState: WorkedHoursSlice = {
    ...defaultState,
    workedHours: []
};

const workedHoursSlice = createSlice({
    name: 'workedHours',
    initialState,
    reducers: {
        createWorkedHour: createPendingReducerWithPayload<WorkedHoursSlice, SetWorkedHoursType>(),
        createWorkedHourSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, WorkedHour>(),
        createWorkedHourFail: createErrorReducer(),

        fetchWorkedHours: createPendingReducerWithPayload<WorkedHoursSlice, number>(),
        fetchWorkedHoursSuccess: createSuccessReducerWithPayload<WorkedHoursSlice, WorkedHour[]>(
            (state: WorkedHoursSlice, action: PayloadAction<WorkedHour[]>) => {
                state.workedHours = action.payload;
            }),
        fetchWorkedHoursFail: createErrorReducer(),

        editWorkedHour: createPendingReducerWithPayload<WorkedHoursSlice, UpdateWorkedHoursType>(),
        editWorkedHourSuccess: createSuccessReducerWithoutPayload(),
        editWorkedHourFail: createErrorReducer(),

        deleteWorkedHour: createPendingReducerWithPayload<WorkedHoursSlice, number>(),
        deleteWorkedHourSuccess: createSuccessReducerWithoutPayload(),
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
