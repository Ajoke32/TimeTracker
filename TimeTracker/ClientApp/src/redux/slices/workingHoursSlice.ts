import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkingHoursSlice {
    startTime: string;
    endTime: string;
    timeDifference: number;
}

const initialState: WorkingHoursSlice = {
    startTime: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
    endTime: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
    timeDifference: 0,
};

const workingHoursSlice = createSlice({
    name: 'workingHours',
    initialState,
    reducers: {
        setStartTime: (state, action: PayloadAction<string>) => {
            state.startTime = action.payload;
        },

        setEndTime: (state, action: PayloadAction<string>) => {
            state.endTime = action.payload;
        },
        
    },
});

export const { setStartTime, setEndTime } = workingHoursSlice.actions;
export const workingHours =  workingHoursSlice.reducer;
