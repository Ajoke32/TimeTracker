import React, {useState} from 'react';
import StepsElement from "../UI/Misc/StepsElement";
import ApproversTable from "../UI/Tables/ApproversTable";
import {User} from "../../redux";
import "./AddUserForms.css"
import {SmallButton} from "../UI";

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
                id: Math.floor(Math.random() * 1000), // Generate a random number for the id
                firstName: `User${i + 1}`, // Replace with a random first name or any logic you prefer
                lastName: `Lastname${i + 1}`, // Replace with a random last name or any logic you prefer
                email: `user${i + 1}@example.com`, // Replace with a random email or any logic you prefer
                password: "password", // Replace with a random password or any logic you prefer
                workType: Math.floor(Math.random() * 3), // Generate a random number for workType (0, 1, or 2)
                permissions: Math.floor(Math.random() * 4), // Generate a random number for permissions (0 to 3)
                vacationDays: Math.floor(Math.random() * 30), // Generate a random number for vacationDays (0 to 29)
                hoursPerMonth: Math.floor(Math.random() * 160), // Generate a random number for hoursPerMonth (0 to 159)
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