import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TimerState {
    startedAt: Date | null;
    pausedAt: Date | null;
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
}

const initialState: TimerState = {
    startedAt: null,
    pausedAt : null,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        resetTimer: (state) => initialState,
        
        startTimer: (state) => {
            state.isRunning = true;
            if (!state.startedAt)
                state.startedAt = new Date();
            
            state.pausedAt = null;
        },
        
        stopTimer: (state) => {
            state.isRunning = false;
            state.pausedAt = new Date();
        },
        
        tick: (state) => {
            state.seconds += 1;

            if (state.seconds === 60) {
                state.seconds = 0;
                state.minutes += 1;
            }

            if (state.minutes === 60) {
                state.minutes = 0;
                state.hours += 1;
            }
        },
        
        updateTimerTime: (state) => {
            if (state.startedAt && state.pausedAt) {
                const elapsedTimeInSeconds = Math.floor(
                (new Date(state.pausedAt).getTime() - new Date(state.startedAt).getTime()) / 1000
                );
                
                state.hours = Math.floor(elapsedTimeInSeconds / 3600);
                state.minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
                state.seconds = elapsedTimeInSeconds % 60;
            }
        },
    },
});

export const { resetTimer, startTimer, tick, updateTimerTime, stopTimer } = timerSlice.actions;
export const timer = timerSlice.reducer;

