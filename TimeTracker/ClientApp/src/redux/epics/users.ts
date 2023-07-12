import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {PayloadAction} from "@reduxjs/toolkit";
import {FetchUsersQuery} from "../queries/userQueries";
import {fetchUsersFail, fetchUsersSuccess} from "../slices";
import {User} from "../intrerfaces";


export const fetchUsersEpic: Epic = (action: Observable<PayloadAction<User[]>>, state) =>
    action.pipe(
        ofType("users/fetchUsers"),
        mergeMap(action =>
            FetchUsersQuery()
                .pipe(
                    map(resp => {
                        if (resp.response.errors != null) {
                            console.log(resp.response.errors[0].message)
                            return fetchUsersFail(resp.response.errors[0].message)
                        }
                        console.log(resp.response.data.userQuery.users);
                        return fetchUsersSuccess(resp.response.data.userQuery.users);
                    }),
                    catchError((e: Error) => {
                        console.log(e);
                        return of(fetchUsersFail("unexpected error"))})
                ),
        )
    );