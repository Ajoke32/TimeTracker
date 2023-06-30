import React from 'react';
import "./LoginMenuSeparator.css"

const LoginMenuSeparator = () => {
    return (
        <div className="login-separator__wrapper">
            <hr className="horizontal-line"/><p className="separator-text">Or</p><hr className="horizontal-line"/>
        </div>
    );
};

export default LoginMenuSeparator;