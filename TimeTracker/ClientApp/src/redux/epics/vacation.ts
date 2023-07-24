import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import { VacationInputType } from "../types";
import {AddVacationQuery, FetchUserVacations, UpdateVacationState} from "../queries";

import {
    createVacationFail,
    createVacationSuccess,
    fetchUserVacationsFail,
    fetchUserVacationsSuccess,
    updateVacationStateFail,
    updateVacationStateSuccess,
} from "../slices";
import { GetErrorMessage } from "../../utils";

export const addVacationEpic: Epic = (action: Observable<PayloadAction<VacationInputType>>, state) =>
    action.pipe(
        ofType("vacation/createVacation"),
        mergeMap(action =>
            AddVacationQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = resp.response.errors[0].message;
                        return createVacationFail(errorMessage)
                    }
                    return createVacationSuccess(resp.response.data.vacationMutation.create.id);
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(createVacationFail("unexpected error"))
                })
            ),
        )
    );

export const updateVacationStateEpic: Epic = (action: Observable<PayloadAction<number[]>>, state) =>
    action.pipe(
        ofType("vacation/updateVacationState"),
        mergeMap(action =>
            UpdateVacationState(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return updateVacationStateFail(errorMessage)
                    }
                    return updateVacationStateSuccess();
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(updateVacationStateFail("unexpected error"))
                })
            )
        )
    );

export const fetchUserVacationsEpic:Epic = (action:Observable<PayloadAction<number>>)=>
    action.pipe(
        ofType('vacation/fetchUserVacations'),
        mergeMap(action=>
            FetchUserVacations(action.payload)
                .pipe(
                    map(res=>{
                        if (res.response.errors != null) {
                            return fetchUserVacationsFail(res.response.errors[0].message)
                        }
                        return fetchUserVacationsSuccess(res.response.data.vacationQuery.userVacations);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(fetchUserVacationsFail("unexpected error"))
                    })
                )
        )
    )

