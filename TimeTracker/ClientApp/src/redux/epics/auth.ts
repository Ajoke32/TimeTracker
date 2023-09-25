import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {
    CodeVerifyQuery,
    CreatePasswordQuery,
    RefreshTokenQuery,
    ResetPasswordQuery, SendTwoFactorCodeQuery, TwoFactorLoginQuery,
    UserLoginQuery,
    VerifyUserLoginQuery
} from "../queries";
import {TwoStepInput, TwoStepLoginInput, UpdateTwoStepAuth, UserLoginType} from "../types";
import {
    authorizeWithEmailFail, authorizeWithEmailSuccess,
    codeVerifyFail,
    codeVerifySuccess,
    createPasswordFail,
    createPasswordSuccess,
    getAccessTokenFail,
    getAccessTokenSuccess,
    getUserInfoFromTokenFail,
    getUserInfoFromTokenSuccess,
    loginFail,
    loginSuccess, loginWithCodeFail, loginWithCodeSuccess,
    refreshTokenFail,
    refreshTokenSuccess,
    resetPasswordFail,
    resetPasswordSuccess, sendTwoStepCodeFail, sendTwoStepCodeSuccess, verifyUserLoginFail, verifyUserLoginSuccess
} from '../slices';
import { GetErrorMessage } from "../../utils";
import {CodeVerifyInput, CreatePasswordInput} from "@redux/types/passwordVerifyTypes.ts";
import {
    AuthorizeWithEmailQuery,
    GetAccessTokenQuery,
    GetUserFromAccessTokenQuery
} from "@redux/queries/exteranalAuthQueries.ts";
import {ExternalAuthTokenType, ExternalAuthType} from "@redux/types/authTypes.ts";
import {Inputs} from "@components/UserForms/props.ts";


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





export const externalAuthorizeEpic:Epic = (action$:Observable<PayloadAction<ExternalAuthType>>,state$)=>
    action$.pipe(
        ofType("auth/getAccessToken"),
        mergeMap(action=>
            GetAccessTokenQuery(action.payload)
                .pipe(
                    map(res=>{
                        return getAccessTokenSuccess(res.response.access_token);
                    }),
                    catchError((e:Error)=>{
                        return of(getAccessTokenFail(e.message));
                    })
                )
        )
    )

export const getUserInfoFromTokenEpic:Epic= (action$:Observable<PayloadAction<ExternalAuthTokenType>>,state$)=>
    action$.pipe(
        ofType("auth/getUserInfoFromToken"),
        mergeMap(action$=>
            GetUserFromAccessTokenQuery(action$.payload)
                .pipe(
                    map(res=>{
                        if(!res.response.email){
                            return getUserInfoFromTokenFail("You email not available, make this visible in you account setting")
                        }
                        return getUserInfoFromTokenSuccess(res.response);
                    }),
                    catchError((e:Error)=>{
                        return of(getUserInfoFromTokenFail(e.message));
                    })
                )
        )
    )

export const authorizeWithEmailEpic:Epic=(action$:Observable<PayloadAction<string>>,state$)=>
    action$.pipe(
        ofType("auth/authorizeWithEmail"),
        mergeMap(action$=>
            AuthorizeWithEmailQuery(action$.payload)
                .pipe(
                    map(res=>{
                        if(res.response.errors){
                            return authorizeWithEmailFail(res.response.errors[0].message);
                        }
                        return authorizeWithEmailSuccess(res.response.data.userQuery.externalAuth);
                    }),
                    catchError((e:Error)=>{
                        return of(authorizeWithEmailFail(e.message));
                    })
                )
        )
    )

export const verifyUserLoginEpic:Epic=(action$:Observable<PayloadAction<UserLoginType>>,state$)=>
    action$.pipe(
        ofType("auth/verifyUserLogin"),
        mergeMap(action$=>
            VerifyUserLoginQuery(action$.payload)
                .pipe(
                    map(res=>{
                        if(res.response.errors!==undefined){
                            return verifyUserLoginFail("an error occurred");
                        }
                        return verifyUserLoginSuccess(res.response.data.userQuery.verifyUserLogin);
                    }),
                    catchError((e:Error)=>{
                        console.log("Verify user fail",e);
                        return of(verifyUserLoginFail(e.message));
                    })
                )
        )
    )


export const SendTwoFactorCodeEpic:Epic = (action$:Observable<PayloadAction<TwoStepInput>>,state)=>
    action$.pipe(
        ofType("auth/sendTwoStepCode"),
        mergeMap(action$=>
            SendTwoFactorCodeQuery(action$.payload)
                .pipe(
                    map(res=>{
                        if(res.response.errors!==undefined){
                            console.log(res.response.errors);
                            return sendTwoStepCodeFail("error");
                        }
                        return sendTwoStepCodeSuccess(res.response.data.twoFactorAuthQuery.sendCode);
                    }),
                    catchError((e)=>{
                        console.log("Sent two factor code fail",e);
                        return of(sendTwoStepCodeFail(e.message));
                    })
                )
        )
    )

export const LoginWithCodeEpic:Epic = (action$:Observable<PayloadAction<TwoStepLoginInput>>,state)=>
    action$.pipe(
        ofType("auth/loginWithCode"),
        mergeMap(action$=>
            TwoFactorLoginQuery(action$.payload)
                .pipe(
                    map(res=>{
                        if(res.response.errors!==undefined){
                            return loginWithCodeFail("error occurred");
                        }
                        return loginWithCodeSuccess(res.response.data.twoFactorAuthQuery.login);
                    }),
                    catchError((e)=>{
                        console.log("Login with code fail",e);
                        return of(loginWithCodeFail(e.message));
                    })
                )
        )
    )
