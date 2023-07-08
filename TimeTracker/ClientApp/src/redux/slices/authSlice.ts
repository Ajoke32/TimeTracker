import { createSlice } from "@reduxjs/toolkit"
import { AuthSliceState } from '../intrerfaces';
import { GetUserFromToken, IsUserAuthenticated } from "../../utils";
import { logoutReducer, loginReducer, loginSuccessReducer, loginFailReducer } from './reducers'


const initialState: AuthSliceState = {
    user: GetUserFromToken(),
    status: /*IsUserAuthenticated()*/true,
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
    },
});

export const auth = authSlice.reducer;
export const { login, logout, loginFail, loginSuccess } = authSlice.actions;
