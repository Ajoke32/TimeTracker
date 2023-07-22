import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSliceState, User } from '../intrerfaces';
import {
    defaultState, createPendingReducerWithPayload,
    createSuccessReducerWithPayload, createErrorReducer,
    createSuccessReducerWithoutPayload
} from "./generic";

import {
    addFailReducer, addReducer, addSuccessReducer,
    userVerifyReducer, emailVerifyReducer,
    verifyFailReducer, verifySuccessReducer
} from "./reducers";

const initialState: UserSliceState = {
    ...defaultState,
    user: null,
    vacationDays:0
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: addReducer,
        userAddSuccess: addSuccessReducer,
        userAddFail: addFailReducer,

        userVerify: userVerifyReducer,
        verifySuccess: verifySuccessReducer,
        verifyFail: verifyFailReducer,

        fetchUser: createPendingReducerWithPayload<UserSliceState, number>(),
        fetchUserSuccess: createSuccessReducerWithPayload<UserSliceState, User>(
            (state: UserSliceState, action: PayloadAction<User>) => {
                state.user = action.payload;
            }),
        fetchUserFail: createErrorReducer(),

        editUser: createPendingReducerWithPayload<UserSliceState, User>(),
        editUserSuccess: createSuccessReducerWithoutPayload(),
        editUserFail: createErrorReducer(),


        fetchVacationDays:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchVacationDaysSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state:UserSliceState,action:PayloadAction<number>)=>{
            state.vacationDays=action.payload;
        }),
        fetchVacationDaysFail:createErrorReducer(),
    },
});

export const user = userSlice.reducer;

export const {
    userAdd, userAddSuccess, userAddFail,
    userVerify, verifyFail, verifySuccess,
    fetchUser, fetchUserFail, fetchUserSuccess,
    editUser, editUserFail, editUserSuccess,
    fetchVacationDaysSuccess,fetchVacationDaysFail,fetchVacationDays
} = userSlice.actions;

