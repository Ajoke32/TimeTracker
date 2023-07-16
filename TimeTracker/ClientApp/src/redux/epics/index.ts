import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs";
import { userLoginEpic } from './auth'
import { addUserEpic, passwordConfirmEpic, userVerifyEpic } from './user'
import {fetchUsersEpic} from "./users";
import {addApproversEpic} from "./approvers";
import {addVacationEpic, fetchVacationsRequestsEpic} from "./vacation";

export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        userLoginEpic,
        addUserEpic,
        passwordConfirmEpic,
        userVerifyEpic,
        fetchUsersEpic,
        addApproversEpic,
        addVacationEpic,
        fetchVacationsRequestsEpic
    )
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );