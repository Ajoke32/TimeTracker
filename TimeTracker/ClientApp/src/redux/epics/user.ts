import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { AddUserQuery, PasswordConfirmQuery, FetchUserQuery, EditUserQuery } from "../queries";
import {
    userAddFail, userAddSuccess,
    verifyFail, verifySuccess,
    fetchUserFail, fetchUserSuccess,
    editUserFail, editUserSuccess
} from '../slices';
import { UserAddType } from "../types";
import { User } from "../intrerfaces";
import { GetErrorMessage } from "../../utils";

export const addUserEpic: Epic = (action: Observable<PayloadAction<UserAddType>>, state) =>
    action.pipe(
        ofType("user/userAdd"),
        mergeMap(action =>
            AddUserQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return userAddFail(errorMessage)
                    }
                    return userAddSuccess(resp.response.data.userMutation.create);
                }),
                catchError((e: Error) => {
                    return of(userAddFail("Unexpected error"))
                })
            ),
        )
    );

export const passwordConfirmEpic: Epic = (action: Observable<PayloadAction<{ token: string, password: string }>>, state) =>
    action.pipe(
        ofType("user/userVerify"),
        mergeMap(action =>
            PasswordConfirmQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return verifyFail(errorMessage)
                    }
                    return verifySuccess();
                }),
                catchError((e: Error) => {
                    return of(verifyFail("Unexpected error"))
                })
            ),
        )
    );

export const fetchUserEpic: Epic = (action: Observable<PayloadAction<number>>, state) =>
    action.pipe(
        ofType("user/fetchUser"),
        mergeMap(action =>
            FetchUserQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return fetchUserFail(errorMessage)
                    }
                    return fetchUserSuccess(resp.response.data.userQuery.user);
                }),
                catchError((e: Error) => {
                    console.log(e);
                    return of(verifyFail("Unexpected error"))
                })
            ),
        )
    );

export const editUserEpic: Epic = (action: Observable<PayloadAction<User>>, state) =>
    action.pipe(
        ofType("user/editUser"),
        mergeMap(action =>
            EditUserQuery(action.payload)
                .pipe(
                    mergeMap(async resp => {
                        if (resp.response.errors != null) {
                            const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                            return editUserFail(errorMessage)
                        }
                    
                        console.log("successfully");
                        return editUserSuccess();
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(verifyFail("Unexpected error"))
                    })
                ),
        )
    );