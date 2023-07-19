import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSliceState, User } from '../intrerfaces';
import { FetchUserType } from "../types";
import { defaultState, createPendingReducerWithPayload, createSuccessReducerWithPayload, createErrorReducer } from "./generic";
import { addFailReducer, addReducer, addSuccessReducer, userVerifyReducer, emailVerifyReducer, verifyFailReducer, verifySuccessReducer } from "./reducers";

const initialState: UserSliceState = {
    ...defaultState,
    userId: null,
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: addReducer,
        userAddSuccess: addSuccessReducer,
        userAddFail: addFailReducer,
        userVerify: userVerifyReducer,
        emailVerify: emailVerifyReducer,
        verifySuccess: verifySuccessReducer,
        verifyFail: verifyFailReducer,
        fetchUser: createPendingReducerWithPayload<UserSliceState, number>(),
        fetchUserSuccess: createSuccessReducerWithPayload<UserSliceState, User>(
            (state: UserSliceState, action: PayloadAction<User>) => {
                state.user = action.payload;
            }),
        fetchUserFail: createErrorReducer()
    },
});

export const user = userSlice.reducer;
export const { userAdd, userAddSuccess, userAddFail, userVerify, emailVerify, verifyFail, verifySuccess, fetchUser, fetchUserFail, fetchUserSuccess } = userSlice.actions;
