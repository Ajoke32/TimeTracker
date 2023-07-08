import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { AddUserQuery } from "../queries/userQueries";
import { userAddFail, userAddSuccess } from '../slices';
import { UserAddType } from "../types";

export const addUserEpic: Epic = (action: Observable<PayloadAction<UserAddType>>, state) =>
    action.pipe(
        ofType("user/userAdd"),
        mergeMap(action =>
            AddUserQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return userAddFail(resp.response.errors[0].message)
                        }
                        return userAddSuccess();
                    }),
                    catchError((e: Error) => of(userAddFail("unexpected error")))
                ),
        )
    );