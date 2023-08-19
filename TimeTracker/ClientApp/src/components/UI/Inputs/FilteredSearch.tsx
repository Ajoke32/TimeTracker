import React, {useState} from 'react';
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {addUsersFilters, userFiltersToDefault} from "@redux/slices";
import {WhereFilter} from "@redux/types/filterTypes.ts";
import {useAppDispatch} from "@hooks/customHooks.ts";
import {SearchInput} from "@components/UI";

interface FilteredSearchProps{
    fieldsToSearch:string[],
    filtersToDefault:ActionCreatorWithoutPayload,
    addFilters:ActionCreatorWithPayload<WhereFilter[]>
}

const FilteredSearch = ({filtersToDefault,addFilters,fieldsToSearch}:FilteredSearchProps) => {
    const dispatch =  useAppDispatch();


    function handleSearch(search:string){
        dispatch(filtersToDefault());
        const filters:WhereFilter[] = [];
        for(const field of fieldsToSearch){
            filters.push({property:field,operator:"contains",value:search,connector:"or"});
        }
        dispatch(addFilters(filters));
    }
    function deleteHandle(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.value===""){
            dispatch(filtersToDefault());
        }
    }

    return (
        <>
            <SearchInput onChangeAdditional={deleteHandle} onSearch={handleSearch} name={"search"} placeholder={"Search"} />
        </>
    );
};

export default FilteredSearch;
