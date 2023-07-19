import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { AddUserQuery, PasswordConfirmQuery, UserVerifyQuery, FetchUserQuery } from "../queries/userQueries";
import { userAddFail, userAddSuccess, verifyFail, verifySuccess, fetchUserFail, fetchUserSuccess } from '../slices';
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
                        return userAddSuccess(resp.response.data.userMutation.create);
                    }),
                    catchError((e: Error) => {
                        return of(userAddFail("Unexpected error"))
                    })
                ),
        )
    );

export const userVerifyEpic: Epic = (action: Observable<PayloadAction<string>>, state) =>
    action.pipe(
        ofType("user/emailVerify"),
        mergeMap(action =>
            UserVerifyQuery(action.payload)
                .pipe(
                    map(resp => {
                        console.log(resp.response);
                        if (resp.response.errors != null) {
                            return verifyFail(resp.response.errors[0].message)
                        }
                        if (!resp.response.data.userQuery.verifyUser)
                            return verifyFail("failed 1")
                        return verifySuccess();
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(verifyFail("Unexpected error"))
                    })
                ),
        )
    );

export const passwordConfirmEpic: Epic = (action: Observable<PayloadAction<{ token: string, password: string }>>, state) =>
    action.pipe(
        ofType("user/userVerify"),
        mergeMap(action =>
            PasswordConfirmQuery(action.payload)
                .pipe(
                    map(resp => {
                        console.log(resp.response)
                        if (resp.response.errors != null) {
                            return verifyFail(resp.response.errors[0].message)
                        }
                        if (!resp.response.data.userQuery.verifyUser)
                            return verifyFail("failed 2")
                        return verifySuccess();
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(verifyFail("Unexpected error"))
                    })
                ),
        )
    );

export const fetchUserEpic: Epic = (action: Observable<PayloadAction<number>>, state) =>
action.pipe(
    ofType("user/fetchUser"),
    mergeMap(action =>
        FetchUserQuery(action.payload)
            .pipe(
                map(resp => {
                    if (resp.response.errors != null) {
                        return fetchUserFail(resp.response.errors[0].message)
                    }
                    if (!resp.response.data.userQuery.user)
                        return fetchUserFail("failed 2")
                    return fetchUserSuccess(resp.response.data.userQuery.user);
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(verifyFail("Unexpected error"))
                })
            ),
    )
);