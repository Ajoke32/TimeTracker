import React from "react";
import { LoginForm } from "../../components";
import LoginSideContent from "../../components/LoginSideContent/LoginSideContent";
import "./Login.css"
export const Login = () => {
    return (
        <div className="login-page__wrapper">
            <div className="login-page__wrapper-inner">
                <LoginForm/>
                <LoginSideContent/>
            </div>
        </div>
)};