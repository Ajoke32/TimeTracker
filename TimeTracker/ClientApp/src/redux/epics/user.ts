import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";

import {
    AddUserQuery, PasswordConfirmQuery, UserVerifyQuery,
    FetchUserQuery, EditUserQuery, FetchUserVacationDays
} from "../queries/userQueries";
import {
    userAddFail, userAddSuccess,
    verifyFail, verifySuccess,
    fetchUserFail, fetchUserSuccess,
    editUserFail, editUserSuccess, fetchVacationDaysFail, fetchVacationDaysSuccess
} from '../slices';
import { UserAddType } from "../types";
import { User } from "../intrerfaces";

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
                        if (!resp.response.data.userMutation.verifyUser)
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

export const editUserEpic: Epic = (action: Observable<PayloadAction<User>>, state) =>
    action.pipe(
        ofType("user/editUser"),
        mergeMap(action =>
            EditUserQuery(action.payload)
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            return editUserFail(resp.response.errors[0].message)
                        }
                        if (!resp.response.data.userMutation.update)
                            return editUserFail("failed 2")
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

export const fetchVacationDaysEpic:Epic = (action:Observable<PayloadAction<number>>,state)=>
    action.pipe(
        ofType("user/fetchVacationDays"),
        mergeMap(action=> FetchUserVacationDays(action.payload)
                .pipe(
                    map(res=>{
                        console.log(res);
                        if (res.response.errors != null) {
                            return fetchVacationDaysFail(res.response.errors[0].message)
                        }
                        return fetchVacationDaysSuccess(res.response.data.userQuery.user.vacationDays);
                    }),
                    catchError((e:Error)=>of(fetchVacationDaysFail("Error")))
                ),
        )
    );

export const userEpics = [fetchVacationDaysEpic,passwordConfirmEpic,addUserEpic]
