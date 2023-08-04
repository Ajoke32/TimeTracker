import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { CreateWorkedHourType, UpdateWorkedHourType, WorkedHour } from '@redux/types';
import {
    UpdateWorkedHoursQuery, FetchWorkedHoursQuery,
    DeleteWorkedHoursQuery, CreateWorkedHoursQuery
} from "@redux/queries";
import {
    createWorkedHourFail,
    createWorkedHourSuccess,
    deleteWorkedHourFail,
    deleteWorkedHourSuccess,
    editWorkedHourFail,
    editWorkedHourSuccess,
    fetchWorkedHoursFail,
    fetchWorkedHoursSuccess,
    resetTimerFail,
    resetTimerSuccess
} from '../slices';
import { GetErrorMessage } from "../../utils";

export const createWorkedHourEpic: Epic = (action: Observable<PayloadAction<CreateWorkedHourType>>, state) =>
    action.pipe(
        ofType("workedHours/createWorkedHour"),
        mergeMap(action =>
            CreateWorkedHoursQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return createWorkedHourFail(errorMessage)
                    }
                    return createWorkedHourSuccess(resp.response.data.workedHourMutations.create);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(createWorkedHourFail("Unexpected error"))
                })
            ),
        )
    );

export const resetTimerEpic: Epic = (action: Observable<PayloadAction<CreateWorkedHourType>>, state) =>
    action.pipe(
        ofType("timer/resetTimer"),
        mergeMap(action =>
            CreateWorkedHoursQuery(action.payload).pipe(
                mergeMap(async resp => {

                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return resetTimerFail(errorMessage)
                    }
                    return resetTimerSuccess(resp.response.data.workedHourMutations.create);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(resetTimerFail("Unexpected error"))
                })
            ),
        )
    );

export const resetTimerSuccessEpic: Epic = (action: Observable<PayloadAction<WorkedHour>>, state) =>
action.pipe(
    ofType("timer/resetTimerSuccess"),
    mergeMap(action => {
        return of(createWorkedHourSuccess(action.payload));
    })
)

export const fetchWorkedHoursEpic: Epic = (action: Observable<PayloadAction<number>>, state) =>
    action.pipe(
        ofType("workedHours/fetchWorkedHours"),
        mergeMap(action =>
            FetchWorkedHoursQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return fetchWorkedHoursFail(errorMessage)
                    }
                    return fetchWorkedHoursSuccess(resp.response.data.workedHourQuery.workedHours);
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(fetchWorkedHoursFail("Unexpected error"))
                })
            ),
        )
    );

export const editWorkedHourEpic: Epic = (action: Observable<PayloadAction<UpdateWorkedHourType>>, state) =>
    action.pipe(
        ofType("workedHours/editWorkedHour"),
        mergeMap(action =>
            UpdateWorkedHoursQuery(action.payload)
                .pipe(
                    mergeMap(async resp => {
                        if (resp.response.errors != null) {
                            const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                            return editWorkedHourFail(errorMessage)
                        }
                        return editWorkedHourSuccess(resp.response.data.workedHourMutations.update);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(editWorkedHourFail("Unexpected error"))
                    })
                ),
        )
    );


export const deleteWorkedHourEpic: Epic = (action: Observable<PayloadAction<number>>) =>
    action.pipe(
        ofType('workedHours/deleteWorkedHour'),
        mergeMap(action =>
            DeleteWorkedHoursQuery(action.payload)
                .pipe(
                    map(res => {
                        if (res.response.errors != null) {
                            return deleteWorkedHourFail(res.response.errors[0].message)
                        }
                        return deleteWorkedHourSuccess(res.response.data.workedHourMutations.delete);
                    }),
                    catchError((e: Error) => of(deleteWorkedHourFail("error")))
                )
        )
    )

export const workedHourEpics = [fetchWorkedHoursEpic, createWorkedHourEpic, editWorkedHourEpic, deleteWorkedHourEpic, resetTimerEpic, resetTimerSuccessEpic]