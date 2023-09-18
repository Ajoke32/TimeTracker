import React, {useEffect, useState} from 'react';
import './GoogleAuthCard.css'
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {authorizeWithGoogle,loginSuccess} from "@redux/slices";
import jwt_decode from "jwt-decode";
import {UserType} from "@redux/types";
const GoogleAuthPage = () => {


    const dispatch = useAppDispatch();
    const {error,isAuthorizedWithGoogle,user,defaultToken} = useTypedSelector(s=>s.auth);
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const tokenId = searchParams.get('id_token');
    const  [message,setMessage]  = useState<string>("Your google authorization is being processed. Wait for the result")



    useEffect(() => {
        if(tokenId!==null){
            const token = jwt_decode<GoogleIdToken>(tokenId);
            dispatch(authorizeWithGoogle(token.email));
        }
        if(isAuthorizedWithGoogle){
            dispatch(loginSuccess(defaultToken!));
        }
    }, [isAuthorizedWithGoogle]);

    useEffect(() => {
        if(defaultToken!==null){
            window.location.href="/";
        }
    }, [defaultToken]);


    return (
        <div className="google-auth-card">
            <div className="google-auth-card-inner">
                <div>
                    <h1 style={{fontSize:"20px",color:"#023047",padding:"5px"}}>
                        {message}

                    </h1>
                    {error&&<h1 style={{fontSize:"20px",color:"red",padding:"5px"}}>
                        {error}
                    </h1>}
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthPage;
