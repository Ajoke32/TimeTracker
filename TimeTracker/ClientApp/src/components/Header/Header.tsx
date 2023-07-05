import React from 'react';
import "./Header.css"
const Header = () => {
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
                
                <div className="header-profile__avatar">
                    <span>JD</span>
                </div>
            </div>
        </header>
        
    );
};

export default Header;