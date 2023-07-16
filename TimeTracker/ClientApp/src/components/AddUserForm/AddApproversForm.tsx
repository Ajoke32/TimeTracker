import React, {useState} from 'react';
import {ApproversTable} from "../Tables";
import {User} from "../../redux";
import {SmallButton, StepsElement} from "../UI";
import "./AddUserForms.css"

const AddApproversForm = () => {
    const username = "John Doe";

    const [approvers, setApprovers] = useState<Number[]>([]);

    const handleApproversChange = (newApprovers: Number[]) => {
        setApprovers(newApprovers);
    };
    
    console.log(approvers.join(", "));

    const generateRandomUsers = (count: number): User[] => {
        const users: User[] = [];
        for (let i = 0; i < count; i++) {
            const user: User = {
                id: Math.floor(Math.random() * 1000),
                firstName: `User${i + 1}`,
                lastName: `Lastname${i + 1}`,
                email: `user${i + 1}@example.com`,
                password: "password",
                workType: Math.floor(Math.random() * 3),
                permissions: Math.floor(Math.random() * 4),
                vacationDays: Math.floor(Math.random() * 30),
                hoursPerMonth: Math.floor(Math.random() * 160),
            };
            users.push(user);
        }
        return users;
    };

    const users: User[] = generateRandomUsers(20);
    
    
    return (
        <div className="user-form__wrapper-inner">
            <form>
                <StepsElement title="Step 2/2" currentStep={2}/>

                <span className="user-form__title">Select vacations approver(s) for {username}</span>

                <ApproversTable users={users} onChange={handleApproversChange}/>
                <div className="user-form__btn-wrapper">
                    <a href="/team">Later</a>
                    <SmallButton type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
};

export default AddApproversForm;