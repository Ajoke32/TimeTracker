import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {User, UserSliceState} from '../intrerfaces';
import {
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    createErrorReducer,
    createSuccessReducerWithoutPayload,

} from "./generic";
import {
    addFailReducer, addReducer, addSuccessReducer,
    userVerifyReducer, emailVerifyReducer,
    verifyFailReducer, verifySuccessReducer
} from "./reducers";

const initialState: UserSliceState = {
    loading: false,
    error: "",
    vacationDays:0,
    user:null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdd: addReducer,
        userAddSuccess: addSuccessReducer,
        userAddFail: addFailReducer,
        userVerify: userVerifyReducer,
        emailVerify: emailVerifyReducer,
        verifySuccess: verifySuccessReducer,
        verifyFail: verifyFailReducer,

        fetchVacationDays:createPendingReducerWithPayload<typeof initialState,number>(),
        fetchVacationDaysSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state:UserSliceState,action:PayloadAction<number>)=>{
            state.vacationDays=action.payload;
        }),
        fetchVacationDaysFail:createErrorReducer(),

        editUser: createPendingReducerWithPayload<UserSliceState, User>(),
        editUserSuccess: createSuccessReducerWithoutPayload(),
        editUserFail: createErrorReducer()
    },
});

export const user = userSlice.reducer;
export const { userAdd, userAddSuccess,
    fetchVacationDays,fetchVacationDaysSuccess
    ,fetchVacationDaysFail,
    userAddFail, userVerify
    , emailVerify, verifyFail
    , verifySuccess,editUserSuccess,
    editUserFail,editUser } = userSlice.actions;
