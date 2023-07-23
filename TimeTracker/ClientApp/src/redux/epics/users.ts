import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import { FetchUsersQuery } from "../queries";
import { fetchUsersFail, fetchUsersSuccess } from "../slices";
import { FetchUsersType } from "../types";
import { GetErrorMessage } from "../../utils";

export const fetchUsersEpic: Epic = (action: Observable<PayloadAction<FetchUsersType>>, state) =>
    action.pipe(
        ofType("users/fetchUsers"),
        mergeMap(action =>
            FetchUsersQuery(action.payload)
                .pipe(
                    mergeMap(async resp => {
                        if (resp.response.errors != null) {
                            const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                            return fetchUsersFail(errorMessage)
                        }
                        return fetchUsersSuccess(resp.response.data.userQuery.users);
                    }),
                    catchError((e: Error) => {
                        return of(fetchUsersFail("Unexpected error"))
                    })
                ),
        )
    );