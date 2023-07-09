import { PayloadAction} from "@reduxjs/toolkit";

export interface DefaultState{
    loading:boolean,
    error:string
}
export const defaultState:DefaultState = {
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

export function createSuccessReducer<T extends DefaultState,V>(callback:Function|null=null){
    return (state: T, action: PayloadAction<V>):void => {
        state.loading=false;
        state.error='';
        if(callback!==null)
            callback(state,action);
    }
}

export function createPendingReducer<T extends DefaultState>(callback:Function|null=null){
    return (state: T):void => {
        state.loading=true;
        if(callback!==null)
            callback(state);
    }
}