import "./Team.css"
import { H4, UsersTable, UsersTableNavbar, Loader } from "../../components";
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import {User, fetchUsers} from "../../redux";
import "@components/UI/Buttons/buttons.css"
import {calculateTotalPages} from "../../utils/paging.ts";
import {setSkip, setTake} from "@redux/slices/userFiltersSlice.ts";



export const Team = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const {loading,users} = useTypedSelector(state => state.users);

    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const  {filters,skip,staticTake,take} = useTypedSelector(s=>s.userFilters);
    const {count} = useTypedSelector(s=>s.users);
    const loadMore = () => {
        dispatch(fetchUsers({
            take: take,
            skip: skip,
            userId: authState.user?.id!,
            group:filters.group
        }));
    }

    useEffect(() => {
        loadMore();
    }, [filters,take,skip])

    useEffect(() => {
        setFilteredUsers(users);
    }, [users.length])

    function handlePageClick(page:number){
        dispatch(setTake(staticTake*page));
        dispatch(setSkip((page-1)*staticTake));
    }
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
                            </>
                        }
                    </div>
                </div>
                <div className="pages-wrapper">
                <button className={`btn-base btn-info ${skip==0?'neutral':''}`} disabled={skip==0} onClick={()=>{
                    dispatch(setTake(take-staticTake))
                    dispatch(setSkip(skip-staticTake))
                }}>Prev</button>
                {[...Array(calculateTotalPages(count,5))].map((_, index) => (
                            <div onClick={()=>handlePageClick(index+1)} key={index}>{index + 1}</div>))
                }
                <button className={`btn-base btn-info ${take>count?'neutral':''}`} disabled={take>count} onClick={()=>{
                    dispatch(setTake(take+staticTake))
                    dispatch(setSkip(skip+staticTake))
                }}>Next</button>
                </div>

            </div>
        </div>
    );
};