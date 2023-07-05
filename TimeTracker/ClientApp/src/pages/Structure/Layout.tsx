import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux"
import { logout } from "../../redux";
import Header from "../../components/Header/Header";

import "./Layout.css"
import Dashboard from "../../components/Dashboard/Dashboard";


export const Layout = () => {
    const dispatch = useDispatch();


    return (
        <div className="parent">
            <div className="div1">
                <div className="div1-inner">
                    <a href="/">
                    </a>
                </div>
            </div>
            <div className="div2">
                <Header/>
            </div>
            <div className="div3">
                <Dashboard/>
            </div>
            <div className="div4">
                <main className="App">
                    <button onClick={() => { dispatch(logout()); }}>TEMP LOGOUT</button>
                    <Outlet />
                </main>
            </div>
        </div>
    )
};
