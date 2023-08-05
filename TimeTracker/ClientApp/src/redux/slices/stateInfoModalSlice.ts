import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DefaultState} from "@redux/intrerfaces";
import {createVacation, createVacationFail, createVacationSuccess} from "@redux/slices/vacationSlice.ts";
import {addGenericCase} from "@redux/slices/generic/addModalCase.ts";


export interface InfoModalState{
    isOpen:boolean,
    message:string|null,
    loading:boolean,
    animate:boolean
}

const initialState:InfoModalState = {
    isOpen:false,
    message:null,
    loading:false,
    animate:false
}

const infoModalSlice = createSlice({
    name:"infoModal",
    initialState:initialState,
    reducers:{
        closeInfoModal:(state:InfoModalState)=>{
            state.isOpen=false;
            state.loading=false;
            state.message=null;
        }
    },
    extraReducers:(builder)=>{
        addGenericCase({success:createVacationSuccess,fail:createVacationFail,
            trigger:createVacation,builder:builder});
    }
});

export const infoModalReducer = infoModalSlice.reducer;

export const {closeInfoModal} = infoModalSlice.actions;
