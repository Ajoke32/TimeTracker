import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { UserLoginQuery } from "../queries/userQueries";
import { UserLoginType } from "../types";
import { loginFail, loginSuccess } from '../slices';


export const userLoginEpic: Epic = (action: Observable<PayloadAction<UserLoginType>>, state) =>
    action.pipe(
        ofType("auth/login"),
        mergeMap(action =>
            UserLoginQuery(action.payload)
                .pipe(
                    map(resp => {
                        console.log(resp)
                        if (resp.response.errors != null) {
                            return loginFail(resp.response.errors[0].message)
                        }
                        return loginSuccess(resp.response.data.userQuery.login);
                    }),
                    catchError((e: Error) => {
                        return of(loginFail("Unexpected error"))
                    })
                ),
        )
    );

