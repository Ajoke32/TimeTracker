import { combineEpics, Epic, ofType } from "redux-observable";
import { redirect } from "react-router-dom";
import { PayloadAction } from "@reduxjs/toolkit";
import { map, mergeMap, Observable, of, concat } from "rxjs";
import { UserLoginQuery } from "../queries/userQueries";
import { login, logout } from '../slices';

export const userLoginEpic: Epic = (action: Observable<PayloadAction<{ email: string, password: string }>>, state) =>
    action.pipe(
        ofType("USER_LOGIN"),
        mergeMap(action => UserLoginQuery(action.payload).pipe(
            map((res: string) => login(res))
        ))
    );

export const userLogoutEpic: Epic = (action, state) =>
    action.pipe(
        ofType("USER_LOGOUT"),
        map(() => {
            logout();
        })
    );