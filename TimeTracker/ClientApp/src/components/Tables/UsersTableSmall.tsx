import { useEffect, useState } from 'react'
import { fetchUsers, setUsersSkip, setUsersTake, User } from "../../redux";
import { Checkbox, SearchInput } from "../UI";
import "./usersTableSmall.css"
import { useAppDispatch, useTypedSelector } from "@hooks/customHooks.ts";
import Pager from '@components/Paging/Pager';
import { addUsersFilters, fetchWorkPlans, resetUsersWorkPlans, userFiltersToDefault } from '@redux/slices';
import { WhereFilter } from '@redux/types/filterTypes';
import { GetOneMonthDateRange } from '../../utils';


export const UsersTableSmall = () => {

    const dispatch = useAppDispatch();
    const fieldsToSearch = ["Email", "FirstName", "LastName"];

    const authState = useTypedSelector(state => state.auth);
    const { loading, users, group, skip, perPage, orderBy, take, count } = useTypedSelector(state => state.users);
    const calendarState = useTypedSelector(state => state.calendar);
    const { user } = useTypedSelector(state => state.auth)

    const [filtered, setFiltered] = useState<boolean>(false)
    const [plansAdded, setPlansAdded] = useState<boolean>(false)
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])

    useEffect(() => {
        loadMore();
    }, [group, take, skip, orderBy])

    const loadMore = () => {
        dispatch(fetchUsers({
            take: take,
            skip: skip,
            userId: authState.user?.id!,
            group: group,
            orderBy: orderBy
        }));
    }


    const handleSearch = (search: string) => {
        dispatch(userFiltersToDefault());
        const filters: WhereFilter[] = [];

        for (const field of fieldsToSearch) {
            filters.push({ property: field, operator: "contains", value: search, connector: "or" });
        }

        dispatch(addUsersFilters(filters));
        setFiltered(search != '')
    }

    const handleResetFilter = () => {
        handleSearch("")
        setFiltered(false)
    }

    const handleResetPlans = () => {
        setSelectedUsers([])
        dispatch(resetUsersWorkPlans(user!.id))
        setPlansAdded(false)
    }

    const handleSelect = (value: number, checked: boolean) => {
        const selectedUsersArr = checked
            ? [...selectedUsers, value]
            : selectedUsers.filter((id) => id !== value);

        setSelectedUsers(selectedUsersArr)
    }

    const handleAddPlans = () => {
        dispatch(fetchWorkPlans({
            dateRange: GetOneMonthDateRange(calendarState.currentDate),
            userIds: selectedUsers
        }))
        setPlansAdded(true)
    }

    return (
        <div className='small-users-table-wrapper'>
            <div className='search-header'>
                <div className='search-input-wrapper'>
                    <SearchInput name="search" placeholder="Search" onSearch={handleSearch} />
                </div>


                {filtered &&
                    <div className='reset-button-wrapper'>
                        <button className="reset-btn" onClick={handleResetFilter}>
                            Reset
                        </button>
                    </div>
                }
            </div>

            <div className='users-list-wrapper'>
                {users.map(u =>
                    <div key={u.id} >
                        <Checkbox value={u.id} optionName={`${u.firstName} ${u.lastName}`} isChecked={selectedUsers.includes(u.id)} onChange={handleSelect} />
                    </div>
                )}
            </div>

            {count > perPage &&
                <div className='pager-wrapper'>
                    <Pager capacity={2} skip={skip} take={take} setSkip={setUsersSkip} setTake={setUsersTake}
                        extensions={{ count: count }} perPage={perPage} />
                </div>
            }

            <div className='table-controls-wrapper'>
                <div className='add-user-button-wrapper'>
                    <button className="btn" onClick={handleAddPlans}>
                        Add users' plans
                    </button>
                </div>
                {plansAdded &&
                    <div className='reset-user-button-wrapper'>
                        <button className="reset-btn" onClick={handleResetPlans}>
                            Reset
                        </button>
                    </div>
                }
            </div>


        </div>
    );
};