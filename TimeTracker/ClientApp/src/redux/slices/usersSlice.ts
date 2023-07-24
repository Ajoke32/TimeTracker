import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {DefaultState, User, UserSliceState} from "../intrerfaces";
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
        fetchUsersSuccess: createSuccessReducerWithPayload<UsersSliceState, User[]>(
            (state: UsersSliceState, action: PayloadAction<User[]>) => {
                state.users = [...state.users, ...action.payload];
            }),
        fetchUsersFail: createErrorReducer(),

        deleteUser:createPendingReducerWithPayload<typeof initialState,number>(),
        deleteUserSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state:UsersSliceState,action:PayloadAction<number>)=>{
            state.users = state.users.filter(u=>u.id!==action.payload);
        }),
        deleteUserFail:createErrorReducer()
    },
});

export const users = usersSlice.reducer;
export const { fetchUsersFail,
    fetchUsersSuccess, fetchUsers,deleteUserSuccess,
    deleteUserFail,deleteUser } = usersSlice.actions;