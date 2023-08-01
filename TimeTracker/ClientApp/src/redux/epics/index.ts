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
import {vacationEpics} from "./vacation";
import { addApproversEpic, fetchApproversEpic } from "./approvers";
import { fetchVacationsRequestsEpic, updateApproversVacationsEpic, updateApproverVacationEpic } from "./approverVacation";
import { fetchWorkedHoursEpic, editWorkedHourEpic, setWorkedHourEpic, deleteWorkedHourEpic, createWorkedHourEpic } from "./timeTracker";
import {eventEpics} from "@redux/epics/calendarEvent.ts";



export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        userLoginEpic,
        addUserEpic,
        passwordConfirmEpic,
        fetchUsersEpic,
        addApproversEpic,
        fetchVacationsRequestsEpic,
        fetchApproversEpic,
        updateApproverVacationEpic,
        updateApproversVacationsEpic,
        fetchUserEpic,
        editUserEpic,
        fetchVacationDaysEpic,
        DeleteUserEpic,
        emailConfirmEpic,
        fetchWorkedHoursEpic,
        editWorkedHourEpic,
        setWorkedHourEpic,
        deleteWorkedHourEpic,
        createWorkedHourEpic,
        ...eventEpics,
        ...vacationEpics
    )
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );