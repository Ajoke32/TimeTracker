import React, {useEffect, useState} from 'react';
import './GoogleAuthCard.css'
const GoogleAuthPage = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const  [message,setMessage]  = useState<string>("Your google authorization is being processed. Wait for the result")

    const body = {
        grant_type:"authorization_code",
        code:code,
        redirect_uri:"http://localhost:5166/google-auth",
        client_id:"719631149139-2puo0bcbfep0lmo7cspt1r050b4n94o8.apps.googleusercontent.com",
        client_secret:"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"
    }

    useEffect(() => {

        fetch(`https://accounts.google.com/o/oauth2/token`,
            {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res=>res.json()).then(j=>{
                console.log(j);
            });



    }, []);



    return (
        <div className="google-auth-card">
            <div className="google-auth-card-inner">
                <div>
                    <h1 style={{fontSize:"20px",color:"#023047",padding:"5px"}}>
                        {message}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthPage;
