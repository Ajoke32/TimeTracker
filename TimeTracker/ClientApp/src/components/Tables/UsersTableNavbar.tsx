import { Dropdown, SearchInput, LargeButton, SmallButton, } from "../UI";
import {
    User,
    Permission,
    removeUserFilter,
    addUserFilter,
    addUsersFilters,
    userFiltersToDefault,
    usersPagingToDefault
} from "../../redux";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { userFields } from "@redux/types";
import Filter from "./Filters";
import React, { useState } from "react";
import { WhereFilter } from "@redux/types/filterTypes.ts";

export const UsersTableNavbar = () => {
    const authState = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const fieldsToSearch = ["Email", "FirstName", "LastName"];
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(usersPagingToDefault());
        if (e.target.value === "all") {
            dispatch(removeUserFilter("IsDeleted"));
            return;
        }
        dispatch(addUserFilter({
            operator: "eq",
            value: e.target.value,
            property: "IsDeleted"
        }));
    }

    function handleSearch(search: string) {
        dispatch(userFiltersToDefault());
        const filters: WhereFilter[] = [];
        for (const field of fieldsToSearch) {
            filters.push({ property: field, operator: "contains", value: search, connector: "or" });
        }
        dispatch(addUsersFilters(filters));
    }

    function exportExelClick(){
        fetch("/upload",{
            method:"GET"
        }).then(res=>{
            console.log(res.ok);
            window.location.href="/upload"
        });
    }

    return (
        <div className="users-table__navbar">
            <div className="users-table__navbar-left">
                <Dropdown onSelectChange={(e) => handleChange(e)} options={[{ value: false, name: "Active" },
                { value: true, name: "Inactive" }]} title="Show users" />
                <SearchInput name="search" placeholder="Search by name or email" onSearch={handleSearch} />
            </div>
            {/*<button onClick={exportExelClick} className={"btn-base btn-info"}>Export excel</button>*/}
            <button className="excel-btn"><div></div> <span>Export excel</span></button>
            {(authState.user!.permissions & Permission.Create) ?
                <div className="users-table__navbar-btn">
                    <a className="add-user__link" href="/team/adduser">
                        <LargeButton type="button" value="Add new user" />
                    </a>
                </div> : <></>
            }
        </div>
    );
}