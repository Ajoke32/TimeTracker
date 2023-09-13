import React from 'react';
import {IsUserAuthenticated} from "@utils/authProvider.ts";
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {refreshToken} from "@redux/slices";

type IAuthMiddleware = {
    children: React.ReactElement;
};

const AuthMiddleware:React.FC<IAuthMiddleware> = ({children}) => {

    const dispatch = useAppDispatch();

    const {user} = useTypedSelector(s=>s.auth);

    if(!IsUserAuthenticated()&&user!==null){
       dispatch(refreshToken(user.id));
    }

    return (
        children
    );
};

export default AuthMiddleware;
