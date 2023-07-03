import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux"
import { logout } from "../../redux";


export const Layout = () => {
    const dispatch = useDispatch();


    return (
        <main className="App">
            <button onClick={() => { dispatch(logout()); }}>TEMP LOGOUT</button>
            <Outlet />
        </main>
    )
};
