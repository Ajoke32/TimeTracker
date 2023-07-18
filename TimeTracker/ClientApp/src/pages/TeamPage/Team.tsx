import "./Team.css"
import { H4, Loader } from "../../components";
import { useState, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { UsersTable } from "../../components/Tables";
import { User, fetchUsers } from "../../redux";


export const Team = () => {
    const dispatch = useAppDispatch();

    const [fetched, setFetched] = useState<number>(0);
    const authState = useTypedSelector(state => state.auth);
    const usersState = useTypedSelector(state => state.users);

    const loadMore = () => {
        dispatch(fetchUsers({ take: 5, skip: fetched, activated: false, userId: authState.user?.id! }));
    }

    useEffect(() => {
        loadMore();
    }, [])

    useEffect(() => {
        setFetched(usersState.users.length)
    }, [usersState.users.length])

    return (
        <div className="team-menu__wrapper">
            <div className="team-menu__wrapper-inner">
                <div className="team-menu__header-wrapper">
                    <H4 value="Members" />
                </div>

                <div className="team-menu__main">
                    {usersState.loading ?
                        <Loader /> :
                        <>
                            <UsersTable users={usersState.users} />
                            <button onClick={() => { loadMore() }}>Load more</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};