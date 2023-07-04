import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSliceState } from '../intrerfaces';
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../utils";


const initialState: UserSliceState = {
    user: GetUserFromToken(),
    status: IsUserAuthenticated(),
    loading: false,
    error: ""
};

type UserInput = {
    email: string,
    password: string
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserInput>) => {
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

        userAdd: (state) => {
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
