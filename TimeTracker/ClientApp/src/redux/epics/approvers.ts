import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApproversAddType, FetchApproversType } from "../types";
import { AddApproversQuery } from "../queries/approverQueries";
import { FetchUsersQuery } from "../queries/userQueries";
import { addApproversFail, addApproversSuccess, fetchApproversFail, fetchApproversSuccess } from "../slices/approversSlice";


export const addApproversEpic: Epic = (action: Observable<PayloadAction<ApproversAddType>>, state) =>
    action.pipe(
        ofType("approvers/addApprovers"),
        mergeMap(action =>
            AddApproversQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return addApproversFail(resp.response.errors[0].message)
                        }
                        console.log('successfully added')
                        return addApproversSuccess();
                    }),
                    catchError((e: Error) => {
                        return of(addApproversFail("Unexpected error"))
                    })
                ),
        )
    );

export const fetchApproversEpic: Epic = (action: Observable<PayloadAction<FetchApproversType>>, state) =>
    action.pipe(
        ofType("approvers/fetchApprovers"),
        mergeMap(action =>
            FetchUsersQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return fetchApproversFail(resp.response.errors[0].message)
                        }
                        return fetchApproversSuccess(resp.response.data.userQuery.users);
                    }),
                    catchError((e: Error) => {
                        return of(fetchApproversFail("Unexpected error"))
                    })
                ),
        )
    );