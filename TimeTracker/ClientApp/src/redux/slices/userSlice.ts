import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, UserSliceState } from '../intrerfaces';
import { DeleteCookie, GetDecodedToken, IsUserAuthenticated, SetCookie } from "../../utils";


const initialState: UserSliceState = {
    user: null, // Get user data if needed
    token: GetDecodedToken(),
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
                state.token = GetDecodedToken();
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
            state.token = null;
            state.status = false;
            state.error = "";
            DeleteCookie('user');
        },

        userAdd: (state) => {
            state.loading = true;
        },
        userAddSuccess: (state) => { // TODO Some universal func
            state.loading = false;
        },
        userAddFail: (state, action: PayloadAction<string>) => { // TODO Some universal func
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const user = userSlice.reducer;
export const { login, logout,
    loginSuccess, loginFail,
    userAdd, userAddFail, userAddSuccess } = userSlice.actions;
