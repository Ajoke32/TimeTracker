import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs";

export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics()
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );