import React from 'react';
import "./Dashboard.css"
import Separator from "../UI/Separators/Separator";

const Dashboard = () => {
    return (
        <div>
            <nav>
                <ul className="dashboard-list">
                    <li>
                        <a href="/adduser" className="dashboard-list__link">
                        <div className="dashboard-list__image-wrapper"></div>
                        <span>Dashboard</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="" className="dashboard-list__link">
                            <div className="dashboard-list__image-wrapper"></div>
                            <span>Time Tracker</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="" className="dashboard-list__link">
                            <div className="dashboard-list__image-wrapper"></div>
                            <span>Calendar</span>
                        </a>
                    </li>
                    <Separator/>
                    <li>
                        <a href="" className="dashboard-list__link">
                            <div className="dashboard-list__image-wrapper"></div>
                            <span>Team</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="" className="dashboard-list__link">
                            <div className="dashboard-list__image-wrapper"></div>
                            <span>Settings</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="" className="dashboard-list__link">
                            <div className="dashboard-list__image-wrapper"></div>
                            <span>Log out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;