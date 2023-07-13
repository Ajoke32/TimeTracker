import { AuthSliceState } from "../../intrerfaces";
import { UserLoginType, UserAddType } from "../../types";
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../../utils";
import { PayloadAction } from "@reduxjs/toolkit"


export const logoutReducer = (state: AuthSliceState) => {
    DeleteCookie('user');
    state.status = false;
    state.error = "";
    window.location.reload();
}

export const loginReducer = (state: AuthSliceState, action: PayloadAction<UserLoginType>) => {
    state.loading = true;
    state.error = "";
}

export const loginSuccessReducer = (state: AuthSliceState, action: PayloadAction<{ message: string, code: number }>) => {
    if (action.payload.code === 2) {
        state.loading = false;
        state.error = "Check your email for confirmation letter!";
        return
    }

    SetCookie('user', action.payload.message)
    if (IsUserAuthenticated()) {
        state.status = true;
        state.loading = false;
        state.error = "";
    }
}

export const loginFailReducer = (state: AuthSliceState, action: PayloadAction<string>) => {
    state.status = false;
    state.loading = false;
    state.error = action.payload;
}
