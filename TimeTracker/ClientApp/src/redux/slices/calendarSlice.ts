import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {create} from "domain";

interface CalendarSlice {
    previousDates: number[],
    currentDates: number[],
    nextDates: number[],
    currentDate: Date;
}

const initialState : CalendarSlice = {
    previousDates: setPrevMonthDates(new Date()),
    currentDates: setCurrentMonthDates(new Date()),
    nextDates:  setNextMonthDates(new Date()),
    currentDate: new Date(),
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setDefault: () => initialState,
        
        setPreviousMonth: (state) => {
            state.currentDate.setMonth(state.currentDate.getMonth() - 1);

            if (state.currentDate.getMonth() < 0) {
                state.currentDate = new Date(state.currentDate.getFullYear() -1, 11);
            }
            
            state.previousDates = setPrevMonthDates(state.currentDate);
            state.currentDates = setCurrentMonthDates(state.currentDate);
            state.nextDates = setNextMonthDates(state.currentDate);
        },
        
        setNextMonth: (state) => {
            state.currentDate.setMonth(state.currentDate.getMonth() + 1);
            
            if (state.currentDate.getMonth() > 11) {
                state.currentDate = new Date(state.currentDate.getFullYear() + 1, 0);
            }

            state.previousDates = setPrevMonthDates(state.currentDate);
            state.currentDates = setCurrentMonthDates(state.currentDate);
            state.nextDates = setNextMonthDates(state.currentDate);
        },
        
        setDate: (state, action: PayloadAction<Date>) => {
            state.currentDate = action.payload;

            state.previousDates = setPrevMonthDates(state.currentDate);
            state.currentDates = setCurrentMonthDates(state.currentDate);
            state.nextDates = setNextMonthDates(state.currentDate);
        }
        
        
    }
    });

export const {setDate, setPreviousMonth, setNextMonth,   setDefault} = calendarSlice.actions;

export const calendar = calendarSlice.reducer;

function setPrevMonthDates(date: Date) {
    if (date.getDay() != 1) {
        const dates = [];
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        if (day != 0) {
            for (let i = 1; i < day; i++)
                dates.push(lastDateOfMonth--);
        }
        
    return dates.reverse();
    }
    
    return [];
}

function setCurrentMonthDates(date: Date) {
    const dates = [];
    const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= lastDateOfMonth; i++)
        dates.push(i);
    
    return dates;
}

function setNextMonthDates(date: Date) {
    const dates = [];
    const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let day = new Date(date.getFullYear(), date.getMonth(), lastDateOfMonth).getDay();

 
    for (let i = 1; day < 14; i++) {
        dates.push(i);
        day++;
    }

    return dates;
}