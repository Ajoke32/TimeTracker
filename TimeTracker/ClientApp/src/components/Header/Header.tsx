import "./Header.css"
import { ProfileAvatar } from "../UI";
import { useTypedSelector } from "../../hooks";

export const Header = () => {
    const authState = useTypedSelector(state => state.auth);

    return (
        <header className="header">
            <div className="header-profile__wrapper">
                <div className="header-profile__notifications">
                    <div className="header-profile__notifications-inner">
                        <button></button>
                    </div>
                </div>

                <div className="header-profile__name">
                    <span>{`${authState.user?.firstName} ${authState.user?.lastName}`}</span>
                </div>

                <ProfileAvatar initials={`${authState.user?.firstName[0]}${authState.user?.lastName[0]}`}/>
            </div>
        </header>

    );
};