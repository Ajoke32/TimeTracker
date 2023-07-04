import { ReadCookie } from "./cookieManager";
import { DecodedTokenStructure, TokenStructure } from "../redux";
import jwt_decode from 'jwt-decode';

export const IsUserAuthenticated = (): boolean => {
    const decodedToken = GetDecodedToken();

    if (decodedToken !== null) {
        return decodedToken.exp > new Date();
    }
    return false;
}

export const GetDecodedToken = (): DecodedTokenStructure | null => {
    const userToken = ReadCookie('user');

    if (userToken !== null && userToken !== "") {
        const decodedToken: TokenStructure = jwt_decode(userToken);

        const result: DecodedTokenStructure = {
            Id: parseInt(decodedToken.Id),
            Email: decodedToken.Email,
            FirstName: decodedToken.FirstName,
            LastName: decodedToken.LastName,
            Permissions: parseInt(decodedToken.Permissions),
            VacationDays: parseInt(decodedToken.VacationDays),
            WorkType: parseInt(decodedToken.WorkType),
            exp: new Date(parseInt(decodedToken.exp) * 1000)
        }
        return result;
    }

    return null;
}
