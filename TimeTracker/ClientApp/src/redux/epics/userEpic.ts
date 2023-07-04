import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { AddUserQuery, UserLoginQuery } from "../queries/userQueries";
import { loginFail, loginSuccess, userAddFail, userAddSuccess } from '../slices';
import { User } from "../intrerfaces";

interface userLoginPayload {
    email: string,
    password: string
}
export const userLoginEpic: Epic = (action: Observable<PayloadAction<userLoginPayload>>, state) =>
    action.pipe(
        ofType("user/login"),
        mergeMap(action =>
            UserLoginQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return loginFail(resp.response.errors[0].message)
                        }
                        return loginSuccess(resp.response.data.userQuery.login);
                    }),
                    catchError((e: Error) => of(loginFail("unexpected error")))
                ),
        )
    );

export const addUserEpic: Epic = (action: Observable<PayloadAction<User>>, state) =>
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