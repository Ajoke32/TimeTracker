import { createSlice } from "@reduxjs/toolkit"
import { UserSliceState } from '../intrerfaces';
import { addFailReducer, addReducer, addSuccessReducer } from "./reducers";

const initialState: UserSliceState = {
    loading: false,
    error: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: addReducer,
        userAddSuccess: addSuccessReducer,
        userAddFail: addFailReducer,
    },
});

export const user = userSlice.reducer;
export const { userAdd, userAddSuccess, userAddFail } = userSlice.actions;
