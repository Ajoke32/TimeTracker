import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { Loader } from "@components/UI";
import { H5 } from "@components/Headings";
import { useTypedSelector, useAppDispatch } from "@hooks/customHooks";
import { emailVerify } from "@redux/slices";
import "./EmailConfirm.css"

type Inputs = {
    password: string
}

export const EmailConfirm = () => {

    const dispatch = useAppDispatch();
    const { loading, error, message } = useTypedSelector(state => state.user);

    const urlParams = new URLSearchParams(window.location.search)
    const [param, setParam] = useState<string | null>(urlParams.get('confirm'));

    if (!param)
        return (<Navigate to="/notFound" />)

    useEffect(()=>{
        dispatch(emailVerify(param));
    },[])

    return (
        <div className="user-verify-page-wrapper">
            {loading ? <Loader /> : error ? <H5 value={error} /> : message ? <H5 value={message} /> : <></>}
        </div>
    );


}