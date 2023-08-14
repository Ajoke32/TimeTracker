import {current, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";


export interface WhereFilter{
    property:string,
    value:string,
    operator:string,
    connector?:string|null
}

export interface FiltersType{
    group:WhereFilter[]
}
export interface OrderingType{
    orderBy:{
        property:string,
        direction:string
    }
}
export interface PagingExtraInfo{
    extensions?:{
        count:number
    }
}

export interface PagingType{
    take:number,
    skip:number,
    perPage:number
}

export interface OrderingPagingFilterType extends PagingType,PagingExtraInfo,FiltersType,OrderingType{}
export interface PagingEntityType<T> extends PagingExtraInfo{
    entities:T[],
}

export const defaultPagingState={
    take:5,
    skip:0,
    perPage:5
}

export const basicFilteringReducers={
    addFilter:(state:OrderingPagingFilterType,action:PayloadAction<WhereFilter>)=>{
        state.group.push(action.payload);
    },
    filtersToDefault:(state:OrderingPagingFilterType)=>{
        state.group=[];
    },
    removeFilter:(state:OrderingPagingFilterType,action:PayloadAction<WhereFilter>)=>{
        state.group = state.group.filter(f=>f.property!==action.payload.property);
    },
}

export const basicPagingReducers={
    setTake:(state:OrderingPagingFilterType,action:PayloadAction<number>)=>{
        state.take=action.payload;
    },
    setSkip:(state:OrderingPagingFilterType,action:PayloadAction<number>)=>{
        state.skip=action.payload;
    },
    setPerPage:(state:OrderingPagingFilterType,action:PayloadAction<number>)=>{
        state.perPage=action.payload;
        state.take = action.payload;
    }
}

export const basicOrderingReducers={
    setColumn:(state:OrderingPagingFilterType,action:PayloadAction<string>)=>{
        console.log(current(state.orderBy));

        if(state.orderBy.property===action.payload&&state.orderBy.direction==="DESC"){
            state.orderBy={
                property:"",
                direction:""
            };
            return;
        }

        if(state.orderBy.property==action.payload){
            state.orderBy.direction = "DESC";
        }else {
            state.orderBy = {
                property: action.payload,
                direction: state.orderBy.direction = "ASC"
            };
        }

    },
}