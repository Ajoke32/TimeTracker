import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {RefreshTokenQuery, UserLoginQuery} from "../queries";
import { UserLoginType } from "../types";
import {loginFail, loginSuccess, refreshTokenFail, refreshTokenSuccess} from '../slices';
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

export const refreshTokenEpic:Epic = (action$:Observable<PayloadAction<number>>,state)=>
    action$.pipe(
      ofType('auth/refreshToken'),
      mergeMap(action$=>
            RefreshTokenQuery(action$.payload)
                .pipe(
                    map(resp=>{
                        if (resp.response.errors != null) {

                            return refreshTokenFail(resp.response.errors[0].message);
                        }
                        return refreshTokenSuccess(resp.response.data.userQuery.refreshToken)
                    }),
                    catchError((e:Error)=>{
                        return of(refreshTokenFail("Unexpected error"));
                    })
                )
      )
    )
