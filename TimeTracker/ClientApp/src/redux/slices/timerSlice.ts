import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimerSliceState } from '..';
import { SetWorkedHoursType, WorkedHour, WorkedTime } from '@redux/types';
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";

const initialState: TimerSliceState = {
    ...defaultState,
    startedAt: null,
    pausedAt: null,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        resetTimer: createPendingReducerWithPayload<TimerSliceState, SetWorkedHoursType>(),
        resetTimerSuccess: createSuccessReducerWithPayload<TimerSliceState, WorkedHour>(
            (state: TimerSliceState, action: PayloadAction<WorkedHour>) => {
                state.startedAt = null,
                state.pausedAt = null,
                state.hours = 0,
                state.minutes = 0,
                state.seconds = 0,
                state.isRunning = false
            }
        ),
        resetTimerFail: createErrorReducer(),

        startTimer: (state) => {
            if (!state.startedAt) {
                state.startedAt = Date.now();
            } else if (state.pausedAt) {
                const pausedDuration = state.pausedAt - state.startedAt;
                state.startedAt = Date.now() - pausedDuration;
            }

            state.isRunning = true;
            state.pausedAt = null;
        },

        stopTimer: (state: TimerSliceState) => {
            state.isRunning = false;
            state.pausedAt = Date.now();
        },

        tick: (state) => {
            if (state.startedAt && state.isRunning) {
                const currentTime = Date.now();
                const elapsedTimeInSeconds = Math.floor((currentTime - state.startedAt) / 1000);
                state.hours = Math.floor(elapsedTimeInSeconds / 3600);
                state.minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
                state.seconds = elapsedTimeInSeconds % 60;
            }
        },
    },
});

export const { resetTimer, resetTimerSuccess, resetTimerFail, startTimer, tick, stopTimer } = timerSlice.actions;
export const timer = timerSlice.reducer;


