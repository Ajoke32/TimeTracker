import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, mergeMap, Observable, of, switchMap } from "rxjs";
import { UserLoginQuery } from "../queries";
import { UserLoginType } from "../types";
import { loginFail, loginSuccess } from '../slices';
import { GetErrorMessage } from "../../utils";

export const userLoginEpic: Epic = (action: Observable<PayloadAction<UserLoginType>>, state) =>
    action.pipe(
        ofType("auth/login"),
        mergeMap(action =>
            UserLoginQuery(action.payload).pipe(
                mergeMap(async resp => {
                    if (resp.response.errors != null) {
                        const errorMessage = await GetErrorMessage(resp.response.errors[0].message);
                        return loginFail(errorMessage);
                    }
                    return loginSuccess(resp.response.data.userQuery.login);
                }),
                catchError((e: Error) => {
                    console.log(e)
                    return of(loginFail("Unexpected error"));
                })
            ),
        )
    );