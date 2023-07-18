import { AuthSliceState } from "../../intrerfaces";
import { UserLoginType } from "../../types";
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../../utils";
import { PayloadAction } from "@reduxjs/toolkit"


export const logoutReducer = (state: AuthSliceState) => {
    DeleteCookie('user');
    state.status = false;
    state.error = "";
}

export const loginReducer = (state: AuthSliceState, action: PayloadAction<UserLoginType>) => {
    state.loading = true;
    state.error = "";
}

export const loginSuccessReducer = (state: AuthSliceState, action: PayloadAction<{ message: string, code: number }>) => {
    SetCookie('user', action.payload.message)
    if (IsUserAuthenticated()) {
        state.status = true;
        state.loading = false;
        state.error = "";
        state.user = GetUserFromToken();
    }
}

export const loginFailReducer = (state: AuthSliceState, action: PayloadAction<string>) => {
    state.status = false;
    state.loading = false;
    state.error = action.payload;
}
