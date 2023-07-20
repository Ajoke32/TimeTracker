import { User } from "../../redux";
import { ProfileAvatar, ConfirmModal, Loader } from "../UI";
import { useTypedSelector } from "../../hooks";
import "./tables.css"

export const UsersTable = ({ users }: { users: User[] }) => {
    const usersState = useTypedSelector(state => state.users);

    const handleConfirmButtonClick = (value: number) => {
        console.log(value);
        // setFilteredUsers((users) =>
        //     users.filter((user) => user.id !== value)
        // );
    };
    return (
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
                    {users.map((user) => (

                        <tr key={user.id}>
                            <td>
                                <ProfileAvatar initials={`${user.firstName[0]}${user.lastName[0]}`} />
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
                                        <a href={`/team/edituser/${user.id}`} />
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
    );
};