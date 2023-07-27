import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
    startedAt: number | null;
    pausedAt: number | null;
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
}

const initialState: TimerState = {
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
        resetTimer: () => initialState,

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

        stopTimer: (state) => {
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

export const { resetTimer, startTimer, tick, stopTimer } = timerSlice.actions;
export const timer = timerSlice.reducer;


