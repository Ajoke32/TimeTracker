import React from 'react';
import "./Team.css"
import {H4, LargeButton} from "../../components";
import Dropdown from "../../components/UI/Dropdowns/Dropdown";
import {SearchInput} from "../../components/UI/Inputs/SearchInput";
import {useDispatch} from "react-redux";

const Team = () => {

    const dispatch = useDispatch();
    
    return (
        <div className="team-menu__wrapper">
            <div className="team-menu__wrapper-inner">
                <div className="team-menu__header-wrapper">
                    <H4 value="Members"/>
                </div>
                
                <div className="team-menu__main">
                    <div className="team-menu__main-navbar">
                        <div className="main-navbar__left">
                            <Dropdown options={[{value: true, name: "Active"},{value: false, name: "Inactive"}]} title="Show users"/>
                            <SearchInput name="search" placeholder="Search by name or email" onSearch={null}/>
                        </div>
                        <div className="main-navbar__btn">
                            <a className="add-user__link" href="/team/adduser">
                                <LargeButton type="button" value="Add new user"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;