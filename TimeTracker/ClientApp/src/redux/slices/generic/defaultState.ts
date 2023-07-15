import { PayloadAction} from "@reduxjs/toolkit";
import { DefaultState } from "../../intrerfaces";

export const defaultState: DefaultState = {
    loading: false,
    error: ""
}

export function createErrorReducer<T extends DefaultState>(callback:Function|null=null){
    return (state: T, action: PayloadAction<string>):void => {
        state.loading=false;
        state.error=action.payload;
        if(callback!==null)
            callback(state);

    }
}

export function createSuccessReducerWithPayload<T extends DefaultState,V>(callback:Function|null=null){
    return (state: T, action: PayloadAction<V>):void => {
        state.loading=false;
        state.error='';
        if(callback!==null)
            callback(state,action);
    }
}

export function createSuccessReducerWithoutPayload<T extends DefaultState>(callback:Function|null=null){
    return (state: T):void => {
        state.loading=false;
        state.error='';
        if(callback!==null)
            callback(state);
    }
}


export function createPendingReducer<T extends DefaultState>(callback:Function|null=null){
    return (state: T):void => {
        state.loading=true;
        if(callback!==null)
            callback(state);
    }
}

export function createPendingReducerWithPayload<T extends DefaultState,V>(callback:Function|null=null){
    return (state:T,action:PayloadAction<V>)=>{
        state.loading=true;
        if(callback!==null)
            callback(state,action);
    }
}