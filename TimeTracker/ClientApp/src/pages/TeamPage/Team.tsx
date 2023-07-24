import "./Team.css"
import { H4, UsersTable, UsersTableNavbar, Loader } from "../../components";
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { User, fetchUsers } from "../../redux";
import "@components/UI/Buttons/buttons.css"

export const Team = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const {loading,users} = useTypedSelector(state => state.users);

    const [fetched, setFetched] = useState<number>(0);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const loadMore = () => {
        dispatch(fetchUsers({ take: 5, skip: fetched, activated: false, userId: authState.user?.id! }));
    }

    useEffect(() => {
        loadMore();
    }, [])

    useEffect(() => {
        setFetched(users.length);
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
                        {loading&&users.length==0? <Loader /> :
                            <>
                                <UsersTable users={filteredUsers} />
                                <button className="load-more" onClick={() => { loadMore() }}>{loading?"Loading..":"Load more"}</button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};