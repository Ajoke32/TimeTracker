import "./Team.css"
import { H4, UsersTable, UsersTableNavbar, Loader } from "../../components";
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import {User, fetchUsers, setUsersTake, setUsersSkip, removeUserFilter} from "../../redux";
import "@components/UI/Buttons/buttons.css"
import {calculateTotalPages} from "../../utils/paging.ts";
import {WhereFilter} from "@redux/types/filterTypes.ts";




export const Team = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const {loading,users,group,skip,perPage,take}
        = useTypedSelector(state => state.users);

    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [activePage,setActivePage] = useState<number>(0);

    const {count} = useTypedSelector(s=>s.users);
    const loadMore = () => {
        dispatch(fetchUsers({
            take: take,
            skip: skip,
            userId: authState.user?.id!,
            group:group
        }));
    }

    useEffect(() => {
        console.log(group);
        loadMore();
    }, [group,take,skip])

    useEffect(() => {
        setFilteredUsers(users);
    }, [users.length])

    function handlePageClick(page:number){
        dispatch(setUsersTake(perPage*page));
        dispatch(setUsersSkip((page-1)*perPage));
        setActivePage(page-1);
    }

    function handleRemoveFilter(filter:WhereFilter){
        dispatch(removeUserFilter(filter));
    }

    return (
        <div className="team-menu__wrapper">
            <div className="team-menu__wrapper-inner">
                <div className="team-menu__header-wrapper">
                    <H4 value="Members" />
                    <div className="filters-wrapper">
                        {group.map(f=>{
                            return <span key={f.property} onClick={()=>handleRemoveFilter(f)}
                                         className="btn-base btn-info">{f.property} X</span>
                        })}
                    </div>
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
                    dispatch(setUsersTake(take-perPage))
                    dispatch(setUsersSkip(skip-perPage))
                    setActivePage(prevState => prevState-1);
                }}>Prev</button>
                {[...Array(calculateTotalPages(count,perPage))].map((_, index) => (
                            <div className={`${index===activePage?'active-page':''}`} onClick={()=>handlePageClick(index+1)} key={index}>{index + 1}</div>))
                }
                <button className={`btn-base btn-info ${take>count?'neutral':''}`} disabled={take>count} onClick={()=>{
                    dispatch(setUsersTake(take+perPage))
                    dispatch(setUsersSkip(skip+perPage))
                    setActivePage(prevState => prevState+1);
                }}>Next</button>
                </div>

            </div>
        </div>
    );
};