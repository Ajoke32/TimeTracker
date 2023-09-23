import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthSliceState, } from '../intrerfaces';
import { UserLoginType } from "../types";
import { DeleteCookie, GetUserFromToken, IsUserAuthenticated, SetCookie } from "../../utils";
import {
    createErrorReducer,
    createPendingReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {CodeVerifyInput, CreatePasswordInput} from "@redux/types/passwordVerifyTypes.ts";
import {ExternalAuthTokenType, ExternalAuthType, UserInfoResponse} from "@redux/types/authTypes.ts";

const initialState: AuthSliceState = {
    ...defaultState,
    user: GetUserFromToken(),
    status: IsUserAuthenticated(),
    isEmailConfirmationDelivered:false,
    userId:null,
    accessToken:"",
    isCodeMatch:false,
    userEmail:"",
    currentAuth:"",
    userToken:""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: AuthSliceState) => {
            DeleteCookie('user');
            state.status = false;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        login: createPendingReducerWithPayload<AuthSliceState, UserLoginType>(),
        loginSuccess: createSuccessReducerWithPayload<AuthSliceState, string>(
            (state: AuthSliceState, action: PayloadAction<string>) => {
                SetCookie('user', action.payload)
                state.user = GetUserFromToken();
                if (IsUserAuthenticated()) {
                    state.status = true;
                    state.message="Successfully authorized"
                }
            }),
        loginFail: (state: AuthSliceState, action: PayloadAction<string>) => {
            state.status = false;
            state.loading = false;
            state.error = action.payload;
        },

        refreshToken:createPendingReducerWithPayload<typeof initialState,number>(),
        refreshTokenFail:createErrorReducer(),
        refreshTokenSuccess:createSuccessReducerWithPayload<typeof initialState,string>
        ((state,action)=>{
           SetCookie('user',action.payload);
           state.user=GetUserFromToken();
            if (IsUserAuthenticated()) {
                state.status = true;
            }
        }),

        resetPassword:createPendingReducerWithPayload<typeof  initialState,string>
        ((state,action)=>{
            state.userId=null;
            state.isEmailConfirmationDelivered=false;
        }),
        resetPasswordSuccess:createSuccessReducerWithPayload<typeof initialState,number>
        ((state,action)=>{
            state.isEmailConfirmationDelivered=true;
            state.userId=action.payload;
        }),
        resetPasswordFail:createErrorReducer(),

        codeVerify:createPendingReducerWithPayload<typeof initialState,CodeVerifyInput>
        ((state,action)=>{
            state.isCodeMatch=false;
        }),
        codeVerifySuccess:createSuccessReducerWithPayload<typeof initialState,boolean>
        ((state,action)=>{
            state.isCodeMatch=action.payload;
            state.error=!action.payload?"code does not match":"";
        }),
        codeVerifyFail:createErrorReducer(),

        createPassword:createPendingReducerWithPayload<typeof initialState,CreatePasswordInput>(),
        createPasswordSuccess:createSuccessReducerWithPayload<typeof initialState,string>
        ((state,action)=>{
            state.message=action.payload;
        }),
        createPasswordFail:createErrorReducer(),
        getAccessToken:createPendingReducerWithPayload<typeof initialState,ExternalAuthType>(),
        getAccessTokenSuccess:createSuccessReducerWithPayload<typeof initialState,string>
        ((state, action)=>{
            state.accessToken=action.payload;
        }),
        getAccessTokenFail:createErrorReducer(),

        getUserInfoFromToken:createPendingReducerWithPayload<typeof initialState,ExternalAuthTokenType>
        ((state,action)=>{
            state.userEmail="";
        }),

        getUserInfoFromTokenSuccess:createSuccessReducerWithPayload<typeof initialState,UserInfoResponse>
        ((state, action)=>{
            state.userEmail=action.payload.email;
        }),
        getUserInfoFromTokenFail:createErrorReducer(),

        authorizeWithEmail:createPendingReducerWithPayload<typeof initialState,string>(),
        authorizeWithEmailSuccess:createSuccessReducerWithPayload<typeof initialState,string>
        ((state, action)=>{
            state.userToken=action.payload;
        }),
        authorizeWithEmailFail:createErrorReducer()

    },
});


export const { login, logout, loginFail
    , loginSuccess,refreshTokenSuccess,refreshTokenFail
    ,refreshToken,resetPassword,resetPasswordSuccess
    ,resetPasswordFail,codeVerify,codeVerifySuccess
    ,codeVerifyFail,createPasswordFail,createPasswordSuccess
    ,createPassword,getAccessToken,getAccessTokenSuccess,getAccessTokenFail,
    getUserInfoFromTokenFail,getUserInfoFromTokenSuccess,
    getUserInfoFromToken,authorizeWithEmailSuccess,authorizeWithEmailFail,authorizeWithEmail} = authSlice.actions;

export const auth = authSlice.reducer;