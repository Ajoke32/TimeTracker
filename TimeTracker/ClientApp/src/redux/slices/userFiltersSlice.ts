import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FiltersType, WhereFilter} from "@redux/types/filterTypes.ts";
import {fetchUsers, fetchUsersSuccess} from "@redux/slices/usersSlice.ts";

export interface UserFiltersState{
    filters:FiltersType,
    take:number,
    skip:number,
    staticTake:number
}
const initialState:UserFiltersState={
    filters:{
        group:[]
    },
    take:5,
    skip:0,
    staticTake:5
}

const userFiltersSlice = createSlice({
    name: 'userFilters',
    initialState,
    reducers: {
        addUserFilter:(state:UserFiltersState,action:PayloadAction<WhereFilter>)=>{
            state.filters.group.push(action.payload);
        },
        userFiltersToDefault:(state:UserFiltersState)=>{
            state.filters=initialState.filters;
        },
        setTake:(state:UserFiltersState,action:PayloadAction<number>)=>{
            state.take=action.payload;
        },
        setSkip:(state:UserFiltersState,action:PayloadAction<number>)=>{
            state.skip=action.payload;
        },
    },
});


export const { addUserFilter,setTake,setSkip,userFiltersToDefault }
    = userFiltersSlice.actions;
export const userFilters = userFiltersSlice.reducer;