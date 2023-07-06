<<<<<<< HEAD
﻿import "./Sidebar.css"
import { Separator } from "../UI/Separators";

export const Sidebar = () => {
=======
﻿import React from 'react';
import Separator from "../UI/Separators/Separator";
import {useDispatch} from "react-redux";
import {logout} from "../../redux";
import "./Sidebar.css"
const Sidebar = () => {

    const dispatch = useDispatch();
    
>>>>>>> 0aeef1a39958325a784fd2bfeb0fcc527e6ca99e
    return (
        <div>
            <nav>
                <ul className="sidebar-list">
                    <li>
                        <a href="/adduser" className="sidebar-list__link">
<<<<<<< HEAD
                            <div className="sidebar-list__image-wrapper"></div>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"></div>
                            <span>Time Tracker</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"></div>
                            <span>Calendar</span>
                        </a>
                    </li>
                    <Separator />
                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"></div>
                            <span>Team</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"></div>
                            <span>Settings</span>
                        </a>
                    </li>

                    <li>
                        <a href="" className="sidebar-list__link">
                            <div className="sidebar-list__image-wrapper"></div>
                            <span>Log out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
=======
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
                    <Separator/>
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

export default Sidebar;
>>>>>>> 0aeef1a39958325a784fd2bfeb0fcc527e6ca99e
