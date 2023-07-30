import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createErrorReducer,
    createPendingReducer, createPendingReducerWithPayload, createSuccessReducerWithoutPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "@redux/slices/generic";
import {DefaultState} from "@redux/intrerfaces";
import {CalendarEvent, CalendarEventInput} from "@redux/types/calendarEventTypes.ts";


interface CalendarEventState extends DefaultState{
    events:CalendarEvent[],
    fetched:boolean,
    created?:CalendarEvent,
    deleted:boolean
}

const initialState:CalendarEventState = {
    events:[],
    ...defaultState,
    fetched:false,
    deleted:false
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
            state.events.push(action.payload);
        }),
        createEventFail:createErrorReducer(),

        deleteEvent:createPendingReducerWithPayload<typeof initialState,number>
        ((state:CalendarEventState)=>{
            state.deleted=false;
        }),
        deleteEventFail:createErrorReducer(),
        deleteEventSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state:CalendarEventState,action:PayloadAction<number>)=>{
            state.events=state.events.filter(e=>e.id!==action.payload);
            state.deleted=true;
        })
    }
});

export const calendarEvent = calendarEventSlice.reducer;
export const {fetchEvents,
    fetchEventsSuccess,fetchEventsFail,
createEventSuccess,
    createEventFail,createEvent,
deleteEvent,deleteEventSuccess,deleteEventFail} = calendarEventSlice.actions;