import "./Team.css"
import { H4, UsersTable, UsersTableNavbar } from "../../components";
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { User, fetchUsers } from "../../redux";


export const Team = () => {
    const dispatch = useAppDispatch();
    const authState = useTypedSelector(state => state.auth);
    const usersState = useTypedSelector(state => state.users);

    const [fetched, setFetched] = useState<number>(0);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(usersState.users);

    const loadMore = () => {
        dispatch(fetchUsers({ take: 5, skip: fetched, activated: false, userId: authState.user?.id! }));
    }

    useEffect(() => {
        loadMore();
    }, [])

    useEffect(() => {
        setFetched(usersState.users.length);
        setFilteredUsers(usersState.users);
    }, [usersState.users.length])


    return (
        <div className="team-menu__wrapper">
            <div className="team-menu__wrapper-inner">
                <div className="team-menu__header-wrapper">
                    <H4 value="Members" />
                </div>

                <div className="team-menu__main">
                    <div className="users-table__wrapper">
                        <UsersTableNavbar users={usersState.users} setFilteredUsers={setFilteredUsers} />
                        <UsersTable users={filteredUsers} />
                        <button onClick={() => { loadMore() }}>Load more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};