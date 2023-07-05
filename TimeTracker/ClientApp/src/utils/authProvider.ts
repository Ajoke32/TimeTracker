import { ReadCookie } from "./cookieManager";
import { TokenStructure } from "../redux";
import jwt_decode from 'jwt-decode';

export const IsUserAuthenticated = (): boolean => {
    const userToken = ReadCookie('user');

    if (userToken !== null && userToken !== "") {
        const decodedToken: TokenStructure = jwt_decode(userToken);
        return new Date(decodedToken.exp * 1000) > new Date();
    }
    return false;
}


