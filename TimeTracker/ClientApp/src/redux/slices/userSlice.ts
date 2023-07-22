import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { UserSliceState } from '../intrerfaces';
import { addFailReducer, addReducer, addSuccessReducer, userVerifyReducer, emailVerifyReducer, verifyFailReducer, verifySuccessReducer } from "./reducers";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload
} from "./generic";

const initialState: UserSliceState = {
    loading: false,
    error: "",
    userId: null,
    vacationDays:0
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
        fetchVacationDaysFail:createErrorReducer()
    },
});

export const user = userSlice.reducer;
export const { userAdd, userAddSuccess,
    fetchVacationDays,fetchVacationDaysSuccess,fetchVacationDaysFail, userAddFail, userVerify, emailVerify, verifyFail, verifySuccess } = userSlice.actions;
