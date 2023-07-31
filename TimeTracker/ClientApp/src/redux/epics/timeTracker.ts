import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { SetWorkedHoursType, UpdateWorkedHoursType } from '@redux/types';
import {
    SetWorkedHoursQuery, UpdateWorkedHoursQuery,
    FetchWorkedHoursQuery, DeleteWorkedHoursQuery, CreateWorkedHoursQuery
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

export const createWorkedHourEpic: Epic = (action: Observable<PayloadAction<SetWorkedHoursType>>, state) =>
    action.pipe(
        ofType("workedHours/createWorkedHour"),
        mergeMap(action =>
            CreateWorkedHoursQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return createWorkedHourFail(errorMessage)
                    }
                    console.log(resp.response)
                    return createWorkedHourSuccess(resp.response.data.workedHoursMutations.create);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(createWorkedHourFail("Unexpected error"))
                })
            ),
        )
    );

export const setWorkedHourEpic: Epic = (action: Observable<PayloadAction<SetWorkedHoursType>>, state) =>
    action.pipe(
        ofType("timer/resetTimer"),
        mergeMap(action =>
            SetWorkedHoursQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return resetTimerFail(errorMessage)
                    }
                    console.log(resp.response)
                    return resetTimerSuccess(resp.response.data.workedHoursMutations.set);
                }),
                catchError((e: Error) => {
                    return of(resetTimerFail("Unexpected error"))
                })
            ),
        )
    );


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

export const editWorkedHourEpic: Epic = (action: Observable<PayloadAction<UpdateWorkedHoursType>>, state) =>
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
                        console.log("successfully");
                        console.log(resp.response)
                        return editWorkedHourSuccess();
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
                        console.log(res.response)
                        return deleteWorkedHourSuccess();
                    }),
                    catchError((e: Error) => of(deleteWorkedHourFail("error")))
                )
        )
    )
