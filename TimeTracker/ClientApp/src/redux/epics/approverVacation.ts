import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    UpdateApproverVacations,
    UpdateApproverVacationState,
    FetchVacationsRequest
} from "../queries";
import {
    fetchRequestsFail,
    fetchRequestsSuccess,
    updateApproversVacationsFail,
    updateApproversVacationsSuccess,
    updateApproverVacationStateStateFail,
    updateApproverVacationStateStateSuccess
} from "../slices";
import {
    ApproverVacationUpdate,
    VacationApproverInput
} from "../types";
import { GetErrorMessage } from "../../utils";

export const updateApproverVacationEpic: Epic = (action: Observable<PayloadAction<ApproverVacationUpdate>>, state) =>
    action.pipe(
        ofType("approverVacation/updateApproverVacationState"),
        mergeMap(action =>
            UpdateApproverVacationState(action.payload.vacationId, action.payload.isApproved, action.payload.id!,action.payload.message)
                .pipe(
                    mergeMap(async resp => {
                        if (resp.response.errors != null) {
                            return updateApproverVacationStateStateFail(resp.response.errors[0].message)
                        }
                        return updateApproverVacationStateStateSuccess(resp.response.data.approverVacationMutation.updateState);
                    }),
                    catchError((e: Error) => {
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
                    mergeMap(async resp => {
                        if (resp.response.errors != null) {
                            const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                            return fetchRequestsFail(errorMessage)
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
                    mergeMap(async resp => {
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
