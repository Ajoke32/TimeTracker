import { UserSliceState, User } from '../../intrerfaces';
import { PayloadAction } from "@reduxjs/toolkit"
import { UserAddType } from "../../types";

export const addReducer = (state: UserSliceState, action: PayloadAction<UserAddType>) => {
    state.loading = true;
}

export const addSuccessReducer = (state: UserSliceState, action: PayloadAction<User>) => {
    state.loading = false;
    state.user = action.payload;
}

export const addFailReducer = (state: UserSliceState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
}

export const emailVerifyReducer = (state: UserSliceState, action: PayloadAction<string | undefined>) => {
    state.loading = true;
    state.error = "";
}

export const userVerifyReducer = (state: UserSliceState, action: PayloadAction<{ token: string, password: string }>) => {
    state.loading = true;
    state.error = "";
}

export const verifySuccessReducer = (state: UserSliceState) => {
    state.loading = false;
}

export const verifyFailReducer = (state: UserSliceState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
}