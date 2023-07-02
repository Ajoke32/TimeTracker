import { ReadCookie } from "./cookieManager";
import { TokenStructure } from "../redux/intrerfaces";
import jwt_decode from 'jwt-decode';

export const IsUserAuthenticated = (): boolean => {
    const userToken = ReadCookie('user');

    if (userToken && userToken != "") {
        const decodedToken: TokenStructure = jwt_decode(userToken);
        return new Date(decodedToken.exp*1000) > new Date();
    }
    return false;
}


