import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {PayloadAction} from "@reduxjs/toolkit";
import {VacationInputType} from "../types";
import {AddVacationQuery, UpdateVacationState} from "../queries/vacationQueries";
import {
    createVacationFail,
    createVacationSuccess, updateVacationStateFail, updateVacationStateSuccess,
} from "../slices";


export const addVacationEpic: Epic = (action: Observable<PayloadAction<VacationInputType>>, state) =>
    action.pipe(
        ofType("vacation/createVacation"),
        mergeMap(action =>
            AddVacationQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return createVacationFail(resp.response.errors[0].message)
                        }
                        return createVacationSuccess(resp.response.data.vacationMutation.create.id);
                    }),
                    catchError((e: Error) => {
                        return of(createVacationFail("unexpected error"))
                    })
                ),
        )
    );

export const updateVacationStateEpic:Epic = (action: Observable<PayloadAction<number>>,state)=>
    action.pipe(
        ofType("vacation/updateVacationState"),
        mergeMap(action=>
            UpdateVacationState(action.payload).pipe(
                map(resp => {
                    if (resp.response.errors != null) {
                        return updateVacationStateFail(resp.response.errors[0].message)
                    }
                    return updateVacationStateSuccess();
                }),
                catchError((e: Error) => {
                    return of(updateVacationStateFail("unexpected error"))
                })
            )
        )
    );

