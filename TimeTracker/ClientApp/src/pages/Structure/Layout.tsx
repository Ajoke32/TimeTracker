import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux"


export const Layout = () => {
    const dispatch = useDispatch();


    return (
        <main className="App">
            <button onClick={() => { dispatch({ type: 'USER_LOGOUT' }); }}>TEMP LOGOUT</button>
            <Outlet />
        </main>
    )
};
