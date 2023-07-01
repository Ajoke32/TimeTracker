import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs";
import { userLoginEpic } from './userEpic'

export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        userLoginEpic
    )
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );