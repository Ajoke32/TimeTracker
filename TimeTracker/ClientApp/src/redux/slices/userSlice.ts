import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSliceState } from '../intrerfaces';
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../utils";
import { UserLoginType, UserAddType } from "../types";


const initialState: UserSliceState = {
    user: GetUserFromToken(),
    status: /*IsUserAuthenticated()*/true,
    loading: false,
    error: ""
};



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserLoginType>) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            SetCookie('user', action.payload)
            if (IsUserAuthenticated()) {
                state.status = true;
                state.loading = false;
                state.error = "";
            }
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.status = false;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.error = "";
            DeleteCookie('user');
        },

        userAdd: (state, action: PayloadAction<UserAddType>) => {
            state.loading = true;
        },
        userAddSuccess: (state) => {
            state.loading = false;
        },
        userAddFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const user = userSlice.reducer;
export const { login, logout,
    loginSuccess, loginFail,
    userAdd, userAddFail, userAddSuccess } = userSlice.actions;
