import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { CreateCalendarEventType, CreateWorkedHourType, DateRangeType, UpdateWorkedHourType, WorkedHour } from '@redux/types';
import {
    CreateCalendarEventQuery,
    CreateWorkPlanQuery,
    FetchCalendarEventsQuery,
    FetchWorkPlansQuery
} from "@redux/queries";
import {
    fetchAllWorkPlansSuccess,
    fetchNextWorkPlansSuccess,
    fetchAllCalendarEventsSuccess,
    fetchNextCalendarEventsSuccess,
    fetchFail, createFail, createWorkPlanSuccess, createCalendarEventSuccess
} from '../slices';
import { GetLocalDateFromUTC } from "../../utils";

export const fetchWorkPlansEpic: Epic = (action: Observable<PayloadAction<{ dateRange: DateRangeType; userId: number; }>>, state) =>
    action.pipe(
        ofType("calendar/fetchWorkPlans"),
        mergeMap(action =>
            FetchWorkPlansQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        console.log(resp.response.errors[0])
                        return fetchFail("errorMessage")
                    }
                    const startDate = GetLocalDateFromUTC(action.payload.dateRange.startDate.replace('T', ' '))
                    const endDate = GetLocalDateFromUTC(action.payload.dateRange.endDate.replace('T', ' '))

                    if (startDate.getMonth() == endDate.getMonth())
                        return fetchNextWorkPlansSuccess(resp.response.data.workPlanQuery.workPlans)
                    else
                        return fetchAllWorkPlansSuccess(resp.response.data.workPlanQuery.workPlans);
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(fetchFail("Unexpected error"))
                })
            ),
        )
    );

export const fetchCalendarEventsEpic: Epic = (action: Observable<PayloadAction<DateRangeType>>, state) =>
    action.pipe(
        ofType("calendar/fetchCalendarEvents"),
        mergeMap(action =>
            FetchCalendarEventsQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        console.log(resp.response.errors[0])
                        return fetchFail("errorMessage")
                    }
                    const startDate = GetLocalDateFromUTC(action.payload.startDate.replace('T', ' '))
                    const endDate = GetLocalDateFromUTC(action.payload.endDate.replace('T', ' '))

                    if (startDate.getMonth() == endDate.getMonth())
                        return fetchNextCalendarEventsSuccess(resp.response.data.calendarEventQuery.calendarEvents)
                    else
                        return fetchAllCalendarEventsSuccess(resp.response.data.calendarEventQuery.calendarEvents);
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(fetchFail("Unexpected error"))
                })
            ),
        )
    );

export const createWorkPlanEpic: Epic = (action: Observable<PayloadAction<CreateWorkedHourType>>, state) =>
    action.pipe(
        ofType("calendar/createWorkPlan"),
        mergeMap(action =>
            CreateWorkPlanQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        console.log(resp.response.errors)
                        //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return createFail(resp.response.errors[0].message)
                    }
                    return createWorkPlanSuccess(resp.response.data.workPlanMutations.create);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(createFail("Unexpected error"))
                })
            ),
        )
    );
    
export const createCalendarEventEpic: Epic = (action: Observable<PayloadAction<CreateCalendarEventType>>, state) =>
action.pipe(
    ofType("calendar/createCalendarEvent"),
    mergeMap(action =>
        CreateCalendarEventQuery(action.payload).pipe(
            mergeMap(async resp => {
                if (resp.response.errors != null) {
                    console.log(resp.response.errors)
                    //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                    return createFail(resp.response.errors[0].message)
                }
                return createCalendarEventSuccess(resp.response.data.calendarEventMutations.create);
            }),
            catchError((e: Error) => {
                console.log(e)
                return of(createFail("Unexpected error"))
            })
        ),
    )
);

export const calendarEpics = [fetchWorkPlansEpic, fetchCalendarEventsEpic, createCalendarEventEpic, createWorkPlanEpic]