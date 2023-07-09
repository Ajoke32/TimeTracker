import { Navigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { H2, H5, InputTooltip, Loader } from "../../components";
import { useTypedSelector, useAppDispatch } from "../../hooks";
import { verify } from "../../redux";
import "./EmailVerify.css"


export const EmailVerify = () => {
    const dispatch = useAppDispatch();
    const { code } = useParams();
    const { loading, error } = useTypedSelector(state => state.auth);
    const [dispatched, setDispatched] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        setDispatched(dispatch(verify(code)).type);
    }, []);

    useEffect(() => {
        if (dispatched === 'auth/verify') {
            if (error === '' && !loading)
                {
                    setMessage('successfuly');
                    // ? some timer with auto-redirect
                }
        }
    }, [loading]);

    return (
        <div className="email-verify-page-wrapper">
            <div className="login-form__messages-wrapper">
                {loading ? <Loader /> : ""}
                <H5 value={error ? error : message ? message : ''} />
            </div>
            <H2 value={``} />
            <InputTooltip description="Return to the" url="/" urlTitle="Login" />
        </div>
    )
}