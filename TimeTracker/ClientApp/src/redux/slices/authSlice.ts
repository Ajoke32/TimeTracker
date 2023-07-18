import { createSlice } from "@reduxjs/toolkit"
import { AuthSliceState, } from '../intrerfaces';
import { GetUserFromToken, IsUserAuthenticated } from "../../utils";
import { defaultState } from "./generic";
import {
    logoutReducer, loginReducer,
    loginSuccessReducer, loginFailReducer,
} from './reducers'


const initialState: AuthSliceState = {
    ...defaultState,
    user: GetUserFromToken(),
    status: true//IsUserAuthenticated(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: logoutReducer,
        login: loginReducer,
        loginSuccess: loginSuccessReducer,
        loginFail: loginFailReducer,
    },
});

export const auth = authSlice.reducer;
export const { login, logout, loginFail, loginSuccess } = authSlice.actions;
