import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {PayloadAction} from "@reduxjs/toolkit";
import {CreateApproverVacation, UpdateApproverVacationState} from "../queries/vacationApproverQueries";
import {
    createApproverVacationFail, createApproverVacationSuccess,
    fetchRequestsFail, fetchRequestsSuccess,
    updateApproverVacationStateStateFail,
    updateApproverVacationStateStateSuccess
} from "../slices";
import {FetchVacationsRequest} from "../queries/vacationQueries";
import {ApproverVacationUpdate, VacationApproverInput} from "../types/approverVacationTypes";




export const updateApproverVacationEpic: Epic = (action: Observable<PayloadAction<ApproverVacationUpdate>>, state) =>
    action.pipe(
        ofType("approverVacation/updateApproverVacationState"),
        mergeMap(action =>
            UpdateApproverVacationState(action.payload.id,action.payload.isApproved,action.payload.approverId!)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return updateApproverVacationStateStateFail(resp.response.errors[0].message)
                        }
                        return updateApproverVacationStateStateSuccess(resp.response.data.approverVacationMutation.updateState);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(updateApproverVacationStateStateFail("unexpected error"))
                    })
                ),
        )
    );

export const fetchVacationsRequestsEpic: Epic = (action: Observable<PayloadAction<number>>, state) =>
    action.pipe(
        ofType("approverVacation/fetchRequests"),
        mergeMap(action =>
            FetchVacationsRequest(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return fetchRequestsFail(resp.response.errors[0].message)
                        }
                        return fetchRequestsSuccess(resp.response.data.approverVacationQuery.requests);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(fetchRequestsFail("unexpected error"))
                    })
                ),
        )
    );

export const createApproverVacationEpic: Epic = (action: Observable<PayloadAction<VacationApproverInput>>, state) =>
    action.pipe(
        ofType("approverVacation/createApproverVacation"),
        mergeMap(action =>
            CreateApproverVacation(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return createApproverVacationFail(resp.response.errors[0].message)
                        }
                        return createApproverVacationSuccess();
                    }),
                    catchError((e: Error) => {
                        return of(createApproverVacationFail("unexpected error"))
                    })
                ),
        )
    );
