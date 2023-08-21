import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { SetCalendarEventType, DateRangeType, FetchUsersPlansType, SetWorkPlanType, WorkedHour, SchedulerWorkPlan } from '@redux/types';
import {
    SetCalendarEventQuery,
    SetWorkPlanQuery,
    FetchCalendarEventsQuery,
    FetchWorkPlansQuery,
    DeleteWorkPlanQuery
} from "@redux/queries";
import {
    fetchAllWorkPlansSuccess,
    fetchNextWorkPlansSuccess,
    fetchAllCalendarEventsSuccess,
    fetchNextCalendarEventsSuccess,
    fetchFail, setFail, setWorkPlanSuccess, setCalendarEventSuccess, deleteFail, deleteWorkPlanSuccess
} from '../slices';
import { GetLocalDateFromUTC } from "../../utils";

export const fetchWorkPlansEpic: Epic = (action: Observable<PayloadAction<FetchUsersPlansType>>, state) =>
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

export const setWorkPlanEpic: Epic = (action: Observable<PayloadAction<SetWorkPlanType>>, state) =>
    action.pipe(
        ofType("calendar/setWorkPlan"),
        mergeMap(action =>
            SetWorkPlanQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        console.log(resp.response.errors)
                        //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return setFail(resp.response.errors[0].message)
                    }
                    return setWorkPlanSuccess(resp.response.data.workPlanMutations.set);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(setFail("Unexpected error"))
                })
            ),
        )
    );

export const setCalendarEventEpic: Epic = (action: Observable<PayloadAction<SetCalendarEventType>>, state) =>
    action.pipe(
        ofType("calendar/createCalendarEvent"),
        mergeMap(action =>
            SetCalendarEventQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        console.log(resp.response.errors)
                        //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return setFail(resp.response.errors[0].message)
                    }
                    return setCalendarEventSuccess(resp.response.data.calendarEventMutations.set);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(setFail("Unexpected error"))
                })
            ),
        )
    );

    export const deleteWorkPlanEpic: Epic = (action: Observable<PayloadAction<SchedulerWorkPlan>>, state) =>
    action.pipe(
        ofType("calendar/deleteWorkPlan"),
        mergeMap(action =>
            DeleteWorkPlanQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        console.log(resp.response.errors)
                        //const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return deleteFail(resp.response.errors[0].message)
                    }
                    return resp.response.data.workPlanMutations.delete == null
                    ? deleteFail("Failed to delete (Not found)")
                    : deleteWorkPlanSuccess(resp.response.data.workPlanMutations.delete);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(deleteFail("Unexpected error"))
                })
            ),
        )
    );

export const calendarEpics = [fetchWorkPlansEpic, fetchCalendarEventsEpic, setCalendarEventEpic, setWorkPlanEpic, deleteWorkPlanEpic]