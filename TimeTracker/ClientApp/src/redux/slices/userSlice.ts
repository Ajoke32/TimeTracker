import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSliceState, User, FormattedWorkedHours } from '../intrerfaces';
import { DateRangeType, UpdateWorkedHourType, UserAddType, UserEditType, WorkedFetchType, WorkedHour } from "../types";
import {
    defaultState, createPendingReducerWithPayload,
    createSuccessReducerWithPayload, createErrorReducer,
    createSuccessReducerWithoutPayload
} from "./generic";
import { PagingEntityType } from "@redux/types/filterTypes";
import { GetLocalWorkedHour } from "../../utils";
import moment from "moment";

const initialState: UserSliceState = {
    ...defaultState,
    user: null,
    vacationDays: 0,
    workedHours: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: createPendingReducerWithPayload<UserSliceState, UserAddType>(),
        userAddSuccess: createSuccessReducerWithPayload<UserSliceState, User>(
            (state: UserSliceState, action: PayloadAction<User>) => {
                state.user = action.payload;
            }),
        userAddFail: createErrorReducer(),

        userVerify: createPendingReducerWithPayload<UserSliceState, { token: string, password: string }>(),
        verifySuccess: createSuccessReducerWithoutPayload(),
        verifyFail: createErrorReducer(),

        fetchUser: createPendingReducerWithPayload<UserSliceState, number>(),
        fetchUserSuccess: createSuccessReducerWithPayload<UserSliceState, User>(
            (state: UserSliceState, action: PayloadAction<User>) => {
                state.user = action.payload;
            }),
        fetchUserFail: createErrorReducer(),

        editUser: createPendingReducerWithPayload<UserSliceState, UserEditType>(),
        editUserSuccess: createSuccessReducerWithoutPayload(),
        editUserFail: createErrorReducer(),


        fetchVacationDays: createPendingReducerWithPayload<typeof initialState, number>(),
        fetchVacationDaysSuccess: createSuccessReducerWithPayload<typeof initialState, number>
            ((state: UserSliceState, action: PayloadAction<number>) => {
                state.vacationDays = action.payload;
            }),
        fetchVacationDaysFail: createErrorReducer(),

        emailVerify: createPendingReducerWithPayload<UserSliceState, string>(),

        fetchUserWorkedHours: createPendingReducerWithPayload<UserSliceState, { userId: number, dateRange: DateRangeType }>(),
        fetchUserWorkedHoursSuccess: createSuccessReducerWithPayload<UserSliceState, PagingEntityType<WorkedHour>>(
            (state, action) => {
                const workedHours: FormattedWorkedHours[] = [];
                action.payload.entities.forEach((wh, index) => {
                    action.payload.entities[index] = GetLocalWorkedHour(wh)

                    const userFormattedWorkedHours = workedHours.find(
                        (formattedHours) => moment(formattedHours.date).isSame(moment(wh.date), 'day')
                    );

                    if (!userFormattedWorkedHours) {
                        const newUserFormattedWorkedHours: FormattedWorkedHours = {
                            date: wh.date,
                            workedHours: [wh],
                        };
                        workedHours.push(newUserFormattedWorkedHours);
                    } else {
                        userFormattedWorkedHours.workedHours.push(wh);
                    }
                })
                state.workedHours = workedHours;
            }),
        fetchUserWorkedHoursFail: createErrorReducer(),

        editUserWorkedHour: createPendingReducerWithPayload<UserSliceState, UpdateWorkedHourType>(),
        editUserWorkedHourSuccess: createSuccessReducerWithPayload<UserSliceState, WorkedHour>(
            (state: UserSliceState, action: PayloadAction<WorkedHour>) => {
                for (const wh of state.workedHours) {
                    const index = wh.workedHours.findIndex(
                        (workedHour) => workedHour.id === action.payload.id
                    );
                    if (index !== -1) {
                        wh.workedHours[index] = GetLocalWorkedHour(action.payload);
                        break;
                    }
                }
            }
        ),
        editUserWorkedHourFail: createErrorReducer(),

        deleteUserWorkedHour: createPendingReducerWithPayload<UserSliceState, number>(),
        deleteUserWorkedHourSuccess: createSuccessReducerWithPayload<UserSliceState, number>(
            (state, action) => {
                for (const wh of state.workedHours) {
                    const index = wh.workedHours.findIndex(
                        (workedHour) => workedHour.id === action.payload
                    );
                    if (index !== -1) {
                        wh.workedHours.splice(index, 1);
                        break;
                    }
                }
            }),
        deleteUserWorkedHourFail: createErrorReducer(),
    },
});

export const user = userSlice.reducer;

export const {
    userAdd, userAddSuccess, userAddFail,
    userVerify, verifyFail, verifySuccess,
    fetchUser, fetchUserFail, fetchUserSuccess,
    editUser, editUserFail, editUserSuccess,
    fetchVacationDaysSuccess, fetchVacationDaysFail,
    fetchVacationDays, emailVerify,
    fetchUserWorkedHours, fetchUserWorkedHoursFail, 
    fetchUserWorkedHoursSuccess, editUserWorkedHour,
    editUserWorkedHourFail, editUserWorkedHourSuccess,
    deleteUserWorkedHour, deleteUserWorkedHourFail,
    deleteUserWorkedHourSuccess
} = userSlice.actions;

