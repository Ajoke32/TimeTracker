import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSliceState, User } from '../intrerfaces';
import { UserAddType } from "../types";
import {
    defaultState, createPendingReducerWithPayload,
    createSuccessReducerWithPayload, createErrorReducer,
    createSuccessReducerWithoutPayload
} from "./generic";

const initialState: UserSliceState = {
    ...defaultState,
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: createPendingReducerWithPayload<UserSliceState, UserAddType>(),
        userAddSuccess: createSuccessReducerWithPayload<UserSliceState, User>(
            (state: UserSliceState, action: PayloadAction<User>)=>{
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

        editUser: createPendingReducerWithPayload<UserSliceState, User>(),
        editUserSuccess: createSuccessReducerWithoutPayload(),
        editUserFail: createErrorReducer()
    },
});

export const user = userSlice.reducer;
export const {
    userAdd, userAddSuccess, userAddFail,
    userVerify, verifyFail, verifySuccess,
    fetchUser, fetchUserFail, fetchUserSuccess,
    editUser, editUserFail, editUserSuccess
} = userSlice.actions;
