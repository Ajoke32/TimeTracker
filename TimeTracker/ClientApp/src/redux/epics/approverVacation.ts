import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {PayloadAction} from "@reduxjs/toolkit";
import {
    CreateApproverVacation,
    UpdateApproverVacations,
    UpdateApproverVacationState
} from "../queries/vacationApproverQueries";
import {
    fetchRequestsFail,
    fetchRequestsSuccess,
    updateApproversVacations,
    updateApproversVacationsFail,
    updateApproversVacationsSuccess,
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

export const updateApproversVacationsEpic: Epic = (action: Observable<PayloadAction<VacationApproverInput>>, state) =>
    action.pipe(
        ofType("approverVacation/updateApproversVacations"),
        mergeMap(action =>
            UpdateApproverVacations(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return updateApproversVacationsFail(resp.response.errors[0].message)
                        }
                        return updateApproversVacationsSuccess();
                    }),
                    catchError((e: Error) => {
                        return of(updateApproversVacationsFail("unexpected error"))
                    })
                ),
        )
    );
