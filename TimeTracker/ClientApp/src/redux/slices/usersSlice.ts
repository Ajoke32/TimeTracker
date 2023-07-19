import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultState, User } from "../intrerfaces";
import { FetchUsersType } from "../types";

interface UsersSliceState extends DefaultState {
    users: User[],
}

const initialState: UsersSliceState = {
    ...defaultState,
    users: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers: createPendingReducerWithPayload<UsersSliceState, FetchUsersType>(),
        fetchUsersSuccess: createSuccessReducerWithPayload<typeof initialState, User[]>(
            (state: UsersSliceState, action: PayloadAction<User[]>) => {
                state.users = [...state.users, ...action.payload];
            }),
        fetchUsersFail: createErrorReducer()
    },
});

export const users = usersSlice.reducer;
export const { fetchUsersFail,
    fetchUsersSuccess, fetchUsers } = usersSlice.actions;