import { DefaultState, User } from "../intrerfaces";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithoutPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApproversAddType, FetchApproversType } from "../types";


interface ApproversState extends DefaultState {
    userApprovers: number[],
    approversList: User[]
}

const initialState: ApproversState = {
    ...defaultState,
    userApprovers: [],
    approversList: []
};


const approversSlice = createSlice({
    name: 'approvers',
    initialState,
    reducers: {
        addApprovers: createPendingReducerWithPayload<typeof initialState, ApproversAddType>(),
        addApproversSuccess: createSuccessReducerWithoutPayload(),
        addApproversFail: createErrorReducer(),
        setApprovers: (state: ApproversState, action: PayloadAction<number[]>) => {
            state.userApprovers = action.payload;
        },
        fetchApprovers: createPendingReducerWithPayload<ApproversState, FetchApproversType>(),
        fetchApproversSuccess: createSuccessReducerWithPayload<typeof initialState, User[]>(
            (state: ApproversState, action: PayloadAction<User[]>) => {
                state.approversList = [...state.approversList, ...action.payload];
            }),
        fetchApproversFail: createErrorReducer()
    },
});

export const approvers = approversSlice.reducer;
export const {
    addApprovers, setApprovers,
    addApproversSuccess, addApproversFail,
    fetchApprovers,
    fetchApproversFail, fetchApproversSuccess } = approversSlice.actions;