import React from 'react';
import {User} from "../../../redux";
import ProfileAvatar from "../Misc/ProfileAvatar";
import {Checkbox} from "../Checkboxes";
import {useState} from "react";
import "./tables.css"
import {SearchInput} from "../Inputs/SearchInput";
import {SmallButton} from "../Buttons";

interface ApproversTableProps {
    users: User[],
    onChange: (approvers: Number[]) => void,
}

const ApproversTable = ({users, onChange} : ApproversTableProps) => {
    const [approvers, setApprovers] = useState<Number[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const handleCheckboxChange = (userId: number, checked: boolean) => {
        setApprovers((prevApprovers) => {
            const updatedApprovers = checked
                ? [...prevApprovers, userId]
                : prevApprovers.filter((id) => id !== userId);
            
            onChange(updatedApprovers);
            return updatedApprovers;
        });
    };
    
    
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
            <div className="table-wrapper__inner">
                <table className="approvers-table__table">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="flex-grow-3">User</th>
                        <th>Add as approver</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <ProfileAvatar initials={`${user.firstName[0]}${user.lastName[0]}`}/>
                            </td>
                            <td className="approvers-table__username-row table__name-col">
                                <span className="table__name-col__fullname">{user.firstName} {user.lastName}</span>
                            </td>
                            <td>
                                <Checkbox
                                    value={user.id}
                                    optionName={null}
                                    isChecked={approvers.includes(user.id)}
                                    onChange={(value, checked) => handleCheckboxChange(value, checked)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproversTable;