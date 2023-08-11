import { Outlet } from "react-router-dom";
import {Header, Sidebar} from "../../components/";
import "./Layout.css"
import StateInfoModal from "@components/UI/Modals/StateInfoModal.tsx";





export const Layout = () => {
    return (
        <div className="layout-wrapper">
            <div className="layout-logo__wrapper">
                <div className="layout-logo__wrapper-inner">
                    <a href="/">
                    </a>
                </div>
            </div>
            <div className="layout-header__wrapper">
                <Header/>
            </div>
            <div className="layout-sidebar__wrapper">
                <Sidebar/>
            </div>
            <div className="layout-content__wrapper">
                <main>
                    <Outlet />
                </main>
            </div>
            <StateInfoModal />
        </div>
    )
};
