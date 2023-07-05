import { LoginForm, LoginSideContent } from "../../components";
import "./Login.css"

export const Login = () => {
    return (
        <div className="login-page__wrapper">
            <div className="login-page__wrapper-inner">
                <LoginForm />
                <LoginSideContent />
            </div>
        </div>
    )
};