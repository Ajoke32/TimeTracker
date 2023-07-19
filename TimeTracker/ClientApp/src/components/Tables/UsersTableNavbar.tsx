import { Dropdown, SearchInput, LargeButton,  } from "../UI";
import { User } from "../../redux";

export const UsersTableNavbar = ({users, setFilteredUsers}:{users: User[], setFilteredUsers:any}) => {
    const handleSearch = (searchValue: string) => {
        const filtered = users.filter(
            (user) =>
                (user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchValue.toLowerCase())) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="users-table__navbar">
            <div className="users-table__navbar-left">
                <Dropdown options={[{ value: true, name: "Active" }, { value: false, name: "Inactive" }]} title="Show users" />
                <SearchInput name="search" placeholder="Search by name or email" onSearch={handleSearch} />
            </div>
            <div className="users-table__navbar-btn">
                <a className="add-user__link" href="/team/adduser">
                    <LargeButton type="button" value="Add new user" />
                </a>
            </div>

        </div>
    );
}