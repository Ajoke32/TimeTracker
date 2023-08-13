import {
    createErrorReducer, createPendingReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersSliceState } from "../intrerfaces";
import { FetchUsersType } from "../types";
import {
    basicFilteringReducers,
    basicPagingReducers, defaultPagingState,
    PagingEntityType,
    PagingExtraInfo
} from "@redux/types/filterTypes.ts";



const initialState: UsersSliceState = {
    group: [],
    ...defaultState,
    ...defaultPagingState,
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
        ...basicFilteringReducers,
        ...basicPagingReducers
    },
});

export const users = usersSlice.reducer;
export const { fetchUsersFail,
    fetchUsersSuccess, fetchUsers, deleteUserSuccess,
    deleteUserFail, deleteUser,
    addFilter:addUserFilter,
    setTake:setUsersTake,
    setSkip:setUsersSkip,
    setPerPage:setUsersPerPage,
    filtersToDefault:userFiltersToDefault} = usersSlice.actions;