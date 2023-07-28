import {Epic, ofType} from "redux-observable";

import {PayloadAction} from "@reduxjs/toolkit";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {CreateCalendarEvent, FetchCalendarEvents} from "@redux/queries/calendarEventQueries.ts";
import {
    createEventFail,
    createEventSuccess,
    fetchEventsFail,
    fetchEventsSuccess
} from "@redux/slices/calendarEventSlice.ts";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";




export const addCalendarEventEpic: Epic = (action: Observable<PayloadAction<CalendarEvent>>, state) =>
    action.pipe(
        ofType("calendarEvent/createEvent"),
        mergeMap(action =>
            CreateCalendarEvent(action.payload)
                .pipe(
                    map(res=>{
                        if (res.response.errors != null) {
                            return createEventFail(res.response.errors[0].message);
                        }
                        return createEventSuccess(res.response.data.calendarEventMutation.createEvent);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(fetchEventsFail("Something wrong..."))
                    })
                )
        )
    );

export const fetchCalendarEvents: Epic = (action: Observable<PayloadAction<CalendarEvent>>, state) =>
    action.pipe(
        ofType("calendarEvent/fetchEvents"),
        mergeMap(() =>
               FetchCalendarEvents().pipe(
                   map(res=>{
                       if (res.response.errors != null) {
                           return fetchEventsFail(res.response.errors[0].message);
                       }
                       return fetchEventsSuccess(res.response.data.calendarEventQuery.calendarEvents);
                   }),
                   catchError((e: Error) => {
                       console.log(e);
                       return of(fetchEventsFail("Something wrong..."))
                   })
            )
        ))

export const eventEpics = [fetchCalendarEvents,addCalendarEventEpic]