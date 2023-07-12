import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { UserLoginQuery, PasswordConfirmQuery, UserVerifyQuery } from "../queries/userQueries";
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

export const userVerifyEpic: Epic = (action: Observable<PayloadAction<string>>, state) =>
    action.pipe(
        ofType("auth/verify"),
        mergeMap(action =>
            UserVerifyQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return verifyFail(resp.response.errors[0].message)
                        }
                        if (!resp.response.data.userQuery.verifyUser)
                            return verifyFail("failed")
                        return verifySuccess();
                    }),
                    catchError((e: Error) => {
                        return of(verifyFail("unexpected error"))
                    })
                ),
        )
    );

    export const passwordConfirmEpic: Epic = (action: Observable<PayloadAction<{token:string, password:string}>>, state) =>
    action.pipe(
        ofType("auth/userVerify"),
        mergeMap(action =>
            PasswordConfirmQuery(action.payload)
                .pipe(
                    map(resp => {
                        console.log(resp.response)
                        // if (resp.response.errors != null) {
                        //     return verifyFail(resp.response.errors[0].message)
                        // }
                        // if (!resp.response.data.userQuery.verifyUser)
                        //     return verifyFail("failed")
                        // return verifySuccess();
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return "Error";
                        //return of(verifyFail("unexpected error"))
                    })
                ),
        )
    );