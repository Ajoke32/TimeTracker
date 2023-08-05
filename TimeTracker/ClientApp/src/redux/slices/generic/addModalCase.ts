import {ActionReducerMapBuilder, TypedActionCreator} from "@reduxjs/toolkit/dist/mapBuilders";
import {InfoModalState} from "@redux/slices/stateInfoModalSlice.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


export function addGenericCase({success, fail, trigger, builder}: {
    success: TypedActionCreator<string>,
    fail: ActionCreatorWithPayload<string>,
    trigger: TypedActionCreator<string>,
    builder: ActionReducerMapBuilder<InfoModalState>
}){

    builder.addCase(success,(state:InfoModalState)=>{
        state.isOpen=true;
        state.loading=false;
        state.message="success";
    });
    builder.addCase(fail,(state:InfoModalState,action)=>{
        state.isOpen=true;
        state.loading=false;
        state.message=action.payload;
    });
    builder.addCase(trigger,(state:InfoModalState)=>{
        state.loading=true;
        state.message=null;
        state.animate=true;
    });
}