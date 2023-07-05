import { Epic, ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import { UserLoginQuery } from "../queries/userQueries";
import {loginFail, loginSuccess, logout} from '../slices';

interface userLoginPayload{
    email:string,
    password:string
}
export const userLoginEpic: Epic = (action: Observable<PayloadAction<userLoginPayload>>, state) =>
    action.pipe(
        ofType("user/login"),
        mergeMap(action =>
            UserLoginQuery(action.payload)
                .pipe(
                    map(resp=>{
                        if(resp.response.errors!=null){
                            return loginFail(resp.response.errors[0].message)
                        }
                        return loginSuccess(resp.response.data.userQuery.response);
                    }),
                    catchError((e:Error)=>of(loginFail("unexpected error")))
                ),
        )
    );