import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import {Vacation, VacationChangeType, VacationInputType} from "../types";
import {
    AddVacationQuery,
    ChangeVacationState, DeleteVacation,
    FetchUserVacations,
    UpdateVacation,
    UpdateVacationState
} from "../queries";

import {
    changeVacationSateSuccess,
    changeVacationStateFail,
    createVacationFail,
    createVacationSuccess, deleteVacationFail, deleteVacationSuccess,
    fetchUserVacationsFail,
    fetchUserVacationsSuccess, updateVacationFail,
    updateVacationStateFail,
    updateVacationStateSuccess, updateVacationSuccess,
} from "../slices";
import { GetErrorMessage } from "../../utils";

const addVacationEpic: Epic = (action: Observable<PayloadAction<VacationInputType>>, state) =>
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

const updateVacationStateEpic: Epic = (action: Observable<PayloadAction<number>>, state) =>
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

const fetchUserVacationsEpic:Epic = (action:Observable<PayloadAction<number>>)=>
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

const changeVacationStateEpic:Epic = (action$:Observable<PayloadAction<VacationChangeType>>)=>
    action$.pipe(
        ofType('vacation/changeVacationState'),
        mergeMap(action=>
            ChangeVacationState(action.payload)
                .pipe(
                    map(res=>{
                        if (res.response.errors != null) {
                            return changeVacationStateFail(res.response.errors[0].message)
                        }
                        return changeVacationSateSuccess(res.response.data.vacationMutation.changeState);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(changeVacationStateFail("unexpected error"))
                    })
                )
        )
    )

const updateVacationEpic:Epic=(action$:Observable<PayloadAction<Vacation>>)=>
    action$.pipe(
        ofType('vacation/updateVacation'),
        mergeMap(action=>
            UpdateVacation(action.payload)
                .pipe(
                    map(res=>{
                        if (res.response.errors != null) {
                            return updateVacationFail(res.response.errors[0].message)
                        }
                        return updateVacationSuccess(res.response.data.vacationMutation.update);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(updateVacationFail("unexpected error"))
                    })
                )
        )
    )
const deleteVacationEpic:Epic=(action$:Observable<PayloadAction<Vacation>>)=>
    action$.pipe(
        ofType('vacation/deleteVacation'),
        mergeMap(action$=>
            DeleteVacation(action$.payload)
                .pipe(
                    map(res=>{
                        if (res.response.errors != null) {
                            return deleteVacationFail(res.response.errors[0].message)
                        }
                        return deleteVacationSuccess(res.response.data.vacationMutation.delete);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(deleteVacationFail("unexpected error"))
                    })
                )
        )
    )
export const vacationEpics = [deleteVacationEpic,updateVacationEpic,changeVacationStateEpic,fetchUserVacationsEpic,updateVacationStateEpic,addVacationEpic]
