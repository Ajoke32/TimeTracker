import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {CodeVerifyQuery, CreatePasswordQuery, RefreshTokenQuery, ResetPasswordQuery, UserLoginQuery} from "../queries";
import { UserLoginType } from "../types";
import {
    codeVerifyFail, codeVerifySuccess, createPasswordFail, createPasswordSuccess,
    loginFail,
    loginSuccess,
    refreshTokenFail,
    refreshTokenSuccess,
    resetPasswordFail,
    resetPasswordSuccess
} from '../slices';
import { GetErrorMessage } from "../../utils";
import {CodeVerifyInput, CreatePasswordInput} from "@redux/types/passwordVerifyTypes.ts";
import {ajax} from "rxjs/ajax";


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


export const resetPasswordEpic:Epic = (action$:Observable<PayloadAction<string>>,state)=>
    action$.pipe(
        ofType("auth/resetPassword"),
        mergeMap(action$=>
            ResetPasswordQuery(action$.payload)
                .pipe(
                    map(resp=>{
                        if (resp.response.errors != null) {
                            return resetPasswordFail(resp.response.errors[0].message);
                        }
                        return resetPasswordSuccess(resp.response.data.passwordRecoveryQuery.passwordRecovery)
                    }),
                    catchError((e:Error)=>{
                        console.log(e);
                        return of(resetPasswordFail("Unexpected error"));
                    })
                )
        )
    )

export const codeVerifyEpic:Epic = (action$:Observable<PayloadAction<CodeVerifyInput>>,state)=>
    action$.pipe(
        ofType("auth/codeVerify"),
        mergeMap(action$=>
            CodeVerifyQuery(action$.payload)
                .pipe(
                    map(resp=>{
                        if (resp.response.errors != null) {
                            return codeVerifyFail(resp.response.errors[0].message);
                        }
                        return codeVerifySuccess(resp.response.data.passwordRecoveryQuery.verifyCode)
                    }),
                    catchError((e:Error)=>{
                        return of(codeVerifyFail("Unexpected error"));
                    })
                )
        )
    )

export const createPasswordEpic:Epic = (action$:Observable<PayloadAction<CreatePasswordInput>>,state)=>
    action$.pipe(
        ofType("auth/createPassword"),
        mergeMap(action$=>
            CreatePasswordQuery(action$.payload)
                .pipe(
                    map(resp=>{
                        if (resp.response.errors != null) {
                            return createPasswordFail(resp.response.errors[0].message);
                        }
                        return createPasswordSuccess(resp.response.data.passwordRecoveryQuery.createNewPassword)
                    }),
                    catchError((e:Error)=>{
                        return of(createPasswordFail("Unexpected error"));
                    })
                )
        )
    )

const clientId = "719631149139-2puo0bcbfep0lmo7cspt1r050b4n94o8.apps.googleusercontent.com";
const redirectUrl = "https://localhost:5166/google-auth";

export const googleAuthEpic:Epic = (action:Observable<PayloadAction<string>>,state)=>
    action.pipe(
        ofType("auth/googleAuth"),
        mergeMap(action=>
         ajax.get(`https://accounts.google.com/o/oauth2/v2/auth?
                       scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
                       response_type=code&
                       redirect_uri=${redirectUrl}&
                       client_id=${clientId}`)
             .pipe(
                 map(res=>{
                     console.log(res);
                 }),
                 catchError((e:Error)=>{
                     console.log(e);
                     return of();
                 })
             )
        )
    )
