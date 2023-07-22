import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs";
import { userLoginEpic } from './auth'
//import {addUserEpic, fetchVacationDaysEpic, passwordConfirmEpic, userVerifyEpic} from './user'
import {fetchUsersEpic} from "./users";
import {addVacationEpic, updateVacationStateEpic} from "./vacation";
import { addApproversEpic, fetchApproversEpic } from "./approvers";
import {fetchVacationsRequestsEpic, updateApproversVacationsEpic, updateApproverVacationEpic} from "./approverVacation";
import {userEpics} from './user'

export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        userLoginEpic,
        /*addUserEpic,
        passwordConfirmEpic,
        userVerifyEpic,*/
        ...userEpics,
        fetchUsersEpic,
        addApproversEpic,
        addVacationEpic,
        fetchVacationsRequestsEpic,
        fetchApproversEpic,
        updateApproverVacationEpic,
        updateApproversVacationsEpic,
        updateVacationStateEpic,
        //fetchVacationDaysEpic
    )
        (action$, store$, dependencies).pipe(
            catchError((error, source) => {
                console.error(error);
                return source;
            })
        );