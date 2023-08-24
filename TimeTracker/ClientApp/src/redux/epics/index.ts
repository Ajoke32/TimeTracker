import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs";
import { userLoginEpic } from './auth'
import {
    fetchUserEpic,
    editUserEpic,
    fetchVacationDaysEpic,
    passwordConfirmEpic,
    addUserEpic,
    DeleteUserEpic,
    emailConfirmEpic
} from './user'
import {usersEpics} from "./users";
import {vacationEpics} from "./vacation";
import { addApproversEpic, fetchApproversEpic } from "./approvers";
import {vacationApproverEpics } from "./approverVacation";
import { workedHourEpics } from "./timeTracker";
import { calendarEpics } from "./calendar";





export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        userLoginEpic,
        addUserEpic,
        passwordConfirmEpic,
        addApproversEpic,
        fetchApproversEpic,
        fetchUserEpic,
        editUserEpic,
        fetchVacationDaysEpic,
        DeleteUserEpic,
        emailConfirmEpic,
        ...usersEpics,
        ...workedHourEpics,
        ...vacationEpics,
        ...vacationApproverEpics,
        ...calendarEpics

    )
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );