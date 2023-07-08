import { Separator } from "../UI/Separators";
import { useDispatch } from "react-redux";
import { logout } from "../../redux";
import "./Sidebar.css"

export const Sidebar = () => {

    const dispatch = useDispatch();

    return (
        <div>
            <nav>
                <ul className="sidebar-list">
                    <li>
                        <a href="/" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"><div className="dashboard-img__wrapper"></div></div>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"><div className="timetracker-img__wrapper"></div></div>
                            <span>Time Tracker</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"><div className="calendar-img__wrapper"></div></div>
                            <span>Calendar</span>
                        </a>
                    </li>
                    <Separator />
                    <li>
                        <a href="/team" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"><div className="team-img__wrapper"></div></div>
                            <span>Team</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"><div className="settings-img__wrapper"></div></div>
                            <span>Settings</span>
                        </a>
                    </li>

                    <li>
                        <button onClick={() => { dispatch(logout()); }} className="sidebar-list__link sidebar-logout__btn">
                            <div className="sidebar-list__image-wrapper"><div className="logout-img__wrapper"></div></div>
                            <span>Log out</span>
                        </button>
                    </li>

                </ul>


            </nav>
        </div>
    );
};