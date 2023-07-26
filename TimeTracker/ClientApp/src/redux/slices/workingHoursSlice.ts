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
        
        setTotalWorkTime: (state) => {
            const [hours, minutes] = state.startTime.split(":");
            const [newHours, newMinutes] = state.endTime.split(":");
            
            state.timeDifference = ((parseInt(newHours, 10) * 60) + parseInt(newMinutes)) - ((parseInt(hours) * 60) + parseInt(minutes));
        }
        
    },
});

export const { setStartTime, setEndTime, setTotalWorkTime } = workingHoursSlice.actions;
export const workingHours =  workingHoursSlice.reducer;
