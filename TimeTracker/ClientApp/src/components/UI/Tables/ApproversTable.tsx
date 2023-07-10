import React from 'react';
import {User} from "../../../redux";
import ProfileAvatar from "../Misc/ProfileAvatar";
import {Checkbox} from "../Checkboxes";
import {useState} from "react";
import "./tables.css"
import {SearchInput} from "../Inputs/SearchInput";
import {SmallButton} from "../Buttons";

const ApproversTable = ({users} : {users: User[]}) => {
    const [approvers, setApprovers] = useState<Number[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    
    const handleCheckboxChange = (userId: number, checked: boolean) => {
        if (checked) {
            setApprovers([...approvers, userId]);
        } else {
            setApprovers(approvers.filter(id => id !== userId));
        }
        
    };

    console.log(approvers.join(", "));
    const handleSearch = (searchValue: string) => {
        const filtered = users.filter(
            (user) =>
                user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
    };
    
    return (
        <div className="approvers-table__wrapper">
            <SearchInput name="userSearch" placeholder="Search user" onSearch={handleSearch}/>
            <table className="approvers-table__table">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Add as approver</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((user) => (
                    <tr>
                        <td className="approvers-table__username-row">
                            <ProfileAvatar initials={`${user.firstName[0]}${user.lastName[0]}`}/> 
                            <span>{user.firstName} {user.lastName}</span>
                        </td>
                        <td>
                            <Checkbox 
                                value={user.id} 
                                optionName={null} 
                                isMultipleChoice={false} 
                                onChange={(value, checked) => handleCheckboxChange(value, checked)}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApproversTable;