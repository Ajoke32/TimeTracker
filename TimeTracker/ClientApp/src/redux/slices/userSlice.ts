import { createSlice } from "@reduxjs/toolkit"
import { UserSliceState } from '../intrerfaces';
import { addFailReducer, addReducer, addSuccessReducer, userVerifyReducer, emailVerifyReducer, verifyFailReducer, verifySuccessReducer } from "./reducers";

const initialState: UserSliceState = {
    loading: false,
    error: ""
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
        verifyFail: verifyFailReducer
    },
});

export const user = userSlice.reducer;
export const { userAdd, userAddSuccess, userAddFail, userVerify, emailVerify, verifyFail, verifySuccess } = userSlice.actions;
