import { createSlice } from "@reduxjs/toolkit"
import { AuthSliceState } from '../intrerfaces';
import { GetUserFromToken, IsUserAuthenticated } from "../../utils";
import {
    logoutReducer, loginReducer, emailVerifyReducer,
    loginSuccessReducer, loginFailReducer,
    emailVerifyFailReducer, emailVerifySuccessReducer,
    userVerifyReducer
} from './reducers'


const initialState: AuthSliceState = {
    user: GetUserFromToken(),
    status: IsUserAuthenticated(),
    loading: false,
    error: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: logoutReducer,
        login: loginReducer,
        loginSuccess: loginSuccessReducer,
        loginFail: loginFailReducer,
        verify: emailVerifyReducer,
        verifySuccess: emailVerifySuccessReducer,
        verifyFail: emailVerifyFailReducer,
        userVerify: userVerifyReducer
    },
});

export const auth = authSlice.reducer;
export const { login, logout, loginFail, loginSuccess, verify, verifyFail, verifySuccess, userVerify } = authSlice.actions;
