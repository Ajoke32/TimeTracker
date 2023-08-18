import React, {useState} from 'react';
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {addUsersFilters, userFiltersToDefault} from "@redux/slices";
import {WhereFilter} from "@redux/types/filterTypes.ts";
import {useAppDispatch} from "@hooks/customHooks.ts";

interface FilteredSearchProps{
    fieldsToSearch:string[],
    filtersToDefault:ActionCreatorWithoutPayload,
    addFilters:ActionCreatorWithPayload<WhereFilter[]>
}

const FilteredSearch = ({filtersToDefault,addFilters,fieldsToSearch}:FilteredSearchProps) => {
    const dispatch =  useAppDispatch();

    const [search,setSearch] = useState<string>("");

    function handleSearch(){
        dispatch(filtersToDefault());
        const filters:WhereFilter[] = [];
        for(const field of fieldsToSearch){
            filters.push({property:field,operator:"contains",value:search,connector:"or"});
        }
        dispatch(addFilters(filters));
    }

    return (
        <>
            <input onChange={(e)=>{
                setSearch(e.target.value);
                if(e.target.value===""){
                    dispatch(filtersToDefault());
                }
            }} type="text" placeholder="search" className="input-search"/>
            <button onClick={handleSearch} className="btn-base btn-confirm">search</button>
        </>
    );
};

export default FilteredSearch;
