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
import { fetchUsersEpic } from "./users";
import {addVacationEpic, fetchUserVacationsEpic, updateVacationStateEpic} from "./vacation";
import { addApproversEpic, fetchApproversEpic } from "./approvers";
import { fetchVacationsRequestsEpic, updateApproversVacationsEpic, updateApproverVacationEpic } from "./approverVacation";
import {eventEpics} from "@redux/epics/calendarEvent.ts";



export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        userLoginEpic,
        addUserEpic,
        passwordConfirmEpic,
        fetchUsersEpic,
        addApproversEpic,
        addVacationEpic,
        fetchVacationsRequestsEpic,
        fetchApproversEpic,
        updateApproverVacationEpic,
        updateApproversVacationsEpic,
        updateVacationStateEpic,
        fetchUserEpic,
        editUserEpic,
        fetchVacationDaysEpic,
        fetchUserVacationsEpic,
        DeleteUserEpic,
        emailConfirmEpic,
        ...eventEpics
    )
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );