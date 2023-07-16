import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {PayloadAction} from "@reduxjs/toolkit";
import {VacationInputType} from "../types";
import {AddVacationQuery, FetchVacationsRequest} from "../queries/vacationQueries";
import {
    createVacationFail,
    createVacationSuccess,
    fetchRequestsFail,
    fetchRequestsSuccess
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
                        return createVacationSuccess();
                    }),
                    catchError((e: Error) => {
                        return of(createVacationFail("unexpected error"))
                    })
                ),
        )
    );


export const fetchVacationsRequestsEpic: Epic = (action: Observable<PayloadAction<number>>, state) =>
    action.pipe(
        ofType("vacation/fetchRequests"),
        mergeMap(action =>
            FetchVacationsRequest(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return fetchRequestsFail(resp.response.errors[0].message)
                        }
                        return fetchRequestsSuccess(resp.response.data.userQuery.user.senders);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(fetchRequestsFail("unexpected error"))
                    })
                ),
        )
    );
