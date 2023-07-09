import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { UserLoginQuery, EmailVerifyQuery } from "../queries/userQueries";
import { UserLoginType } from "../types";
import {
    loginFail, loginSuccess,
    verifyFail, verifySuccess
} from '../slices';


export const userLoginEpic: Epic = (action: Observable<PayloadAction<UserLoginType>>, state) =>
    action.pipe(
        ofType("auth/login"),
        mergeMap(action =>
            UserLoginQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return loginFail(resp.response.errors[0].message)
                        }
                        return loginSuccess(resp.response.data.userQuery.login);
                    }),
                    catchError((e: Error) => {
                        return of(loginFail("unexpected error"))
                    })
                ),
        )
    );

export const emailVerifyEpic: Epic = (action: Observable<PayloadAction<string>>, state) =>
    action.pipe(
        ofType("auth/verify"),
        mergeMap(action =>
            EmailVerifyQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return verifyFail(resp.response.errors[0].message)
                        }
                        if (!resp.response.data.userQuery.verifyEmail)
                            return verifyFail("failed")
                        return verifySuccess();
                    }),
                    catchError((e: Error) => {
                        return of(verifyFail("unexpected error"))
                    })
                ),
        )
    );