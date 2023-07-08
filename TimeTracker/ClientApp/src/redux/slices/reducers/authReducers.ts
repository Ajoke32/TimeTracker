import { AuthSliceState } from "../../intrerfaces";
import { UserLoginType, UserAddType } from "../../types";
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../../utils";
import { PayloadAction } from "@reduxjs/toolkit"


export const logoutReducer = (state: AuthSliceState) => {
    state.status = false;
    state.error = "";
    DeleteCookie('user');
}

export const loginReducer = (state: AuthSliceState, action: PayloadAction<UserLoginType>) => {
    state.loading = true;
}

export const loginSuccessReducer = (state: AuthSliceState, action: PayloadAction<string>) => {
    SetCookie('user', action.payload)
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
