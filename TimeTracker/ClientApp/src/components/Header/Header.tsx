import "./Header.css"
import ProfileAvatar from "../UI/Misc/ProfileAvatar";

export const Header = () => {
    return (
        <header className="header">
            <div className="header-profile__wrapper">
                <div className="header-profile__notifications">
                    <div className="header-profile__notifications-inner">
                        <button></button>
                    </div>
                </div>

                <div className="header-profile__name">
                    <span>John Doe</span>
                </div>

                <ProfileAvatar initials="JD"/>
            </div>
        </header>

    );
};