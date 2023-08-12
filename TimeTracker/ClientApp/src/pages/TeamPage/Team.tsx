import "./Team.css"
import { H4, UsersTable, UsersTableNavbar, Loader } from "../../components";
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { User, fetchUsers } from "../../redux";
import "@components/UI/Buttons/buttons.css"
import {FiltersType} from "@redux/types/filterTypes.ts";
import {addUserFilter} from "@redux/slices/userFiltersSlice.ts";



export const Team = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const {loading,users} = useTypedSelector(state => state.users);

    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const  {filters,skip,take} = useTypedSelector(s=>s.userFilters);

    const loadMore = () => {
        console.log(skip);
        dispatch(fetchUsers({
            take: take,
            skip: skip,
            userId: authState.user?.id!,
            group:filters.group
        }));
    }

    useEffect(() => {
        loadMore();
    }, [filters])

    useEffect(() => {
        setFilteredUsers(users);
    }, [users.length])


    return (
        <div className="team-menu__wrapper">
            <div className="team-menu__wrapper-inner">
                <div className="team-menu__header-wrapper">
                    <H4 value="Members" />
                </div>

                <div className="team-menu__main">
                    <div className="users-table__wrapper">
                        <UsersTableNavbar users={users} setFilteredUsers={setFilteredUsers} />
                        {loading? <Loader /> :
                            <>
                                <UsersTable users={users} />
                                <div>

                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};