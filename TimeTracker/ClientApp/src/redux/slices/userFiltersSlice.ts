import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FiltersType, WhereFilter} from "@redux/types/filterTypes.ts";
import {fetchUsers, fetchUsersSuccess} from "@redux/slices/usersSlice.ts";

export interface UserFiltersState{
    filters:FiltersType,
    take:number|null,
    skip:number,
}
const initialState:UserFiltersState={
    filters:{
        group:[]
    },
    take:5,
    skip:0,
}

const userFiltersSlice = createSlice({
    name: 'userFilters',
    initialState,
    reducers: {
        addUserFilter:(state:UserFiltersState,action:PayloadAction<WhereFilter>)=>{
            state.filters.group.push(action.payload);
            state.skip=0;
        },
        userFiltersToDefault:(state:UserFiltersState)=>{
            state.filters=initialState.filters;
            state.skip=0;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsersSuccess,(state, action)=>{
            state.skip = action.payload.length;
        });
    }
});


export const { addUserFilter,userFiltersToDefault }
    = userFiltersSlice.actions;
export const userFilters = userFiltersSlice.reducer;