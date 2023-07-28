import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createErrorReducer,
    createPendingReducer, createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "@redux/slices/generic";
import {DefaultState} from "@redux/intrerfaces";
import {CalendarEvent, CalendarEventInput} from "@redux/types/calendarEventTypes.ts";


interface CalendarEventState extends DefaultState{
    events:CalendarEvent[],
    fetched:boolean,
    created?:CalendarEvent,
}

const initialState:CalendarEventState = {
    events:[],
    ...defaultState,
    fetched:false,
}


const calendarEventSlice = createSlice({
    name:"calendarEvent",
    initialState:initialState,
    reducers:{
        fetchEvents:createPendingReducer((state:CalendarEventState)=>{
            state.fetched=false;
        }),
        fetchEventsSuccess:createSuccessReducerWithPayload<typeof initialState,CalendarEvent[]>
        ((state:CalendarEventState,action:PayloadAction<CalendarEvent[]>)=>{
            state.events=action.payload;
            state.fetched=true;
        }),
        fetchEventsFail:createErrorReducer(),

        createEvent:createPendingReducerWithPayload<typeof initialState,CalendarEventInput>(),
        createEventSuccess:createSuccessReducerWithPayload<typeof initialState,CalendarEvent>
        ((state:CalendarEventState,action:PayloadAction<CalendarEvent>)=>{
            state.created=action.payload;
        }),
        createEventFail:createErrorReducer()
    }
});

export const calendarEvent = calendarEventSlice.reducer;
export const {fetchEvents,
    fetchEventsSuccess,fetchEventsFail,
createEventSuccess,createEventFail,createEvent} = calendarEventSlice.actions;