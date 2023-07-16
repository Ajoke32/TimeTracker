import {
    createErrorReducer,
    createPendingReducer,
    createSuccessReducer,
    defaultState
} from "./generic";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DefaultState, User} from "../intrerfaces";

interface UsersSliceState extends DefaultState{
    users:User[],
}

const initialState:UsersSliceState = {
    ...defaultState,
    users:[],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers: createPendingReducer(),
        fetchUsersSuccess: createSuccessReducer<typeof initialState,User[]>(
            (state:UsersSliceState,action:PayloadAction<User[]>)=>{
            state.users=action.payload;
        }),
        fetchUsersFail: createErrorReducer()
    },
});

export const users = usersSlice.reducer;
export const { fetchUsersFail,
    fetchUsersSuccess,fetchUsers } = usersSlice.actions;