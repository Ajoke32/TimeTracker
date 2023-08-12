import {
    createErrorReducer, createPendingReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersSliceState } from "../intrerfaces";
import { FetchUsersType } from "../types";
import {PagingExtraInfo} from "@redux/types/filterTypes.ts";


interface PagingEntityType<T> extends PagingExtraInfo{
    entities:T[],
}

const initialState: UsersSliceState = {
    ...defaultState,
    users: [],
    count:0
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers: createPendingReducerWithPayload<UsersSliceState, FetchUsersType>(),
        fetchUsersSuccess: createSuccessReducerWithPayload<UsersSliceState, PagingEntityType<User>>(
            (state, action) => {
                state.users = [...action.payload.entities];

                if(action.payload.extensions){
                    state.count=action.payload.extensions.count;
                }
            }),
        fetchUsersFail: createErrorReducer(),

        deleteUser: createPendingReducerWithPayload<typeof initialState, number>(),
        deleteUserSuccess: createSuccessReducerWithPayload<typeof initialState, number>
            ((state: UsersSliceState, action: PayloadAction<number>) => {
                state.users = state.users.filter(u => u.id !== action.payload);
            }),
        deleteUserFail: createErrorReducer(),

        getUsersCount:createPendingReducer(),
        getUsersCountSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state, action)=>{
            state.count=action.payload;
        }),
    },
});

export const users = usersSlice.reducer;
export const { fetchUsersFail,
    fetchUsersSuccess, fetchUsers, deleteUserSuccess,
    deleteUserFail, deleteUser,getUsersCountSuccess,getUsersCount } = usersSlice.actions;