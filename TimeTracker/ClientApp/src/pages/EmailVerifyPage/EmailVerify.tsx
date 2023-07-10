import { Navigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { H2, H5, InputTooltip, Loader } from "../../components";
import { useTypedSelector, useAppDispatch } from "../../hooks";
import { verify } from "../../redux";
import "./EmailVerify.css"


export const EmailVerify = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useTypedSelector(state => state.auth);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')
        dispatch(verify(code!));
    }, []);


    return (
        <div className="email-verify-page-wrapper">
            <div className="login-form__messages-wrapper">
                {loading ? <Loader /> : ""}
                <H5 value={error ? error :!loading?'successfully' : ''} />
            </div>
            <H2 value={``} />
            <InputTooltip description="Return to the" url="/" urlTitle="Login" />
        </div>
    )
}