import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from '../intrerfaces';
import { DeleteCookie, IsUserAuthenticated, SetCookie } from "../../utils";

const initialState: { user: User | null, token: string | null, status: boolean, loading: boolean, error: string } =
{
    user: null,
    token: null,
    status: false,
    loading: false,
    error: ""
}

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
                state.token = action.payload;
                state.status = true;
                state.loading = false;
            }
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.status = false;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.status = false;
            DeleteCookie('user');
        },
    },
});

export const user = userSlice.reducer;
export const { login, logout,
    loginSuccess, loginFail } = userSlice.actions;
