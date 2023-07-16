import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {PayloadAction} from "@reduxjs/toolkit";
import {ApproversAddType} from "../types";
import {AddApproversQuery} from "../queries/approverQueries";
import {addApproversFail, addApproversSuccess} from "../slices/approversSlice";


export const addApproversEpic: Epic = (action: Observable<PayloadAction<ApproversAddType>>, state) =>
    action.pipe(
        ofType("approver/addApprovers"),
        mergeMap(action =>
            AddApproversQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return addApproversFail(resp.response.errors[0].message)
                        }
                        return addApproversSuccess();
                    }),
                    catchError((e: Error) => {
                        return of(addApproversFail("unexpected error"))
                    })
                ),
        )
    );