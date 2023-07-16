﻿import React, { useState } from 'react';
import { User } from "../../redux";
import { ProfileAvatar, Dropdown, SearchInput, LargeButton, ConfirmModal } from "../UI";
import "./tables.css"

export const UsersTable = ({users} : {users: User[]}) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    
    const handleSearch = (searchValue: string) => {
        const filtered = users.filter(
            (user) =>
                (user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchValue.toLowerCase())) || 
                user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleConfirmButtonClick = (value: number) => {
        setFilteredUsers((users) =>
            users.filter((user) => user.id !== value)
        );
    };
    
    
    return (
        <div className="users-table__wrapper">

            <div className="users-table__navbar">
                <div className="users-table__navbar-left">
                    <Dropdown options={[{value: true, name: "Active"},{value: false, name: "Inactive"}]} title="Show users"/>
                    <SearchInput name="search" placeholder="Search by name or email" onSearch={handleSearch}/>
                </div>
                <div className="users-table__navbar-btn">
                    <a className="add-user__link" href="/team/adduser">
                        <LargeButton type="button" value="Add new user" />
                    </a>
            </div>

            </div>
            
            <div className="table-wrapper__inner">
                <table className="users-table__table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Vacation Days</th>
                        <th>Working hours</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredUsers.map((user) => (
                        
                        <tr key={user.id}>
                            <td>
                                <ProfileAvatar initials={`${user.firstName[0]}${user.lastName[0]}`}/>
                            </td>
                            <td className="table__name-col">
                                <span className="table__name-col__fullname">{user.firstName} {user.lastName}</span>
                            </td>
                            <td>
                                <span>{user.email}</span>
                            </td>
                            <td>
                                <span>{user.vacationDays}</span>
                            </td>
                            <td>
                                <span>{user.hoursPerMonth}</span>
                            </td>
                            <td>
                                <div className="users-table__actions-wrapper">
                                    <div className="users-table__actions-edit">
                                        <button>
                                        </button>
                                    </div>
                                    <div className="users-table__actions-archieve">
                                            <ConfirmModal
                                                title="CONFIRM"
                                                description={`Are you sure you want to deactivate ${user.firstName} ${user.lastName}?`}
                                                value={user.id}
                                                onConfirm={handleConfirmButtonClick}
                                            />
                                    </div>
                                        
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};