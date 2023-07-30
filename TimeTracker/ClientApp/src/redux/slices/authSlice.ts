import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthSliceState, } from '../intrerfaces';
import { UserLoginType } from "../types";
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../utils";
import {
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";

const initialState: AuthSliceState = {
    ...defaultState,
    user: GetUserFromToken(),
    status: IsUserAuthenticated(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: AuthSliceState) => {
            DeleteCookie('user');
            state.status = false;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        login: createPendingReducerWithPayload<AuthSliceState, UserLoginType>(),
        loginSuccess: createSuccessReducerWithPayload<AuthSliceState, string>(
            (state: AuthSliceState, action: PayloadAction<string>) => {
                SetCookie('user', action.payload)
                state.user = GetUserFromToken();
                if (IsUserAuthenticated()) {
                    state.status = true;
                }
            }),
        loginFail: (state: AuthSliceState, action: PayloadAction<string>) => {
            state.status = false;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const auth = authSlice.reducer;
export const { login, logout, loginFail, loginSuccess } = authSlice.actions;
