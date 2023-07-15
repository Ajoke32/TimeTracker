import "./Team.css"
import { H4, LargeButton } from "../../components";
import { Dropdown } from "../../components/UI/Dropdowns";
import { SearchInput } from "../../components/UI/Inputs";
import { useDispatch } from "react-redux";
import UsersTable from "../../components/UI/Tables/UsersTable";
import {User} from "../../redux";


export const Team = () => {

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

    const users: User[] = generateRandomUsers(15);
    
    const dispatch = useDispatch();

    return (
        <div className="team-menu__wrapper">
            <div className="team-menu__wrapper-inner">
                <div className="team-menu__header-wrapper">
                    <H4 value="Members" />
                </div>

                <div className="team-menu__main">
                    
                    <UsersTable users={users}/>
                </div>
            </div>
        </div>
    );
};