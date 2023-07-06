import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import { Header, Sidebar } from "../../components";
import "./Layout.css"
=======
import Header from "../../components/Header/Header";
import "./Layout.css"
import Sidebar from "../../components/Sidebar/Sidebar";
>>>>>>> 0aeef1a39958325a784fd2bfeb0fcc527e6ca99e


export const Layout = () => {
    return (
        <div className="layout-wrapper">
            <div className="layout-logo__wrapper">
                <div className="layout-logo__wrapper-inner">
                    <a href="/">
                    </a>
                </div>
            </div>
<<<<<<< HEAD
            <div className="div2">
                <Header />
            </div>
            <div className="div3">
                <Sidebar />
=======
            <div className="layout-header__wrapper">
                <Header/>
            </div>
            <div className="layout-dashboard__wrapper">
                <Sidebar/>
>>>>>>> 0aeef1a39958325a784fd2bfeb0fcc527e6ca99e
            </div>
            <div className="layout-content__wrapper">
                <main className="App">
                    <Outlet />
                </main>
            </div>
        </div>
    )
};
