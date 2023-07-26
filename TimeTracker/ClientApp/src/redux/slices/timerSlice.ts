import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TimerState {
    startTime: string | null;
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
}

const initialState: TimerState = {
    startTime: null,
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
            state.isRunning = true;
            if (!state.startTime)
                state.startTime = new Date().toISOString();
        },
        
        stopTimer: (state) => {
            state.isRunning = false;
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
        
        updateTimerTime: (state, action: PayloadAction<Date>) => {
            if (state.startTime && state.isRunning) {
                const elapsedTimeInSeconds = Math.floor(
                    (action.payload.getTime() - new Date(state.startTime).getTime()) / 1000
                );
                state.hours = Math.floor(elapsedTimeInSeconds / 3600);
                state.minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
                state.seconds = elapsedTimeInSeconds % 60;
            }
        },
        
        refreshTimer: (state, action: PayloadAction<TimerState>) => action.payload,
    },
});

export const { resetTimer, startTimer, tick, updateTimerTime, refreshTimer } = timerSlice.actions;
export const timer = timerSlice.reducer;

