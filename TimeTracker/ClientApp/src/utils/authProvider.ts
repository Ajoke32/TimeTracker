import { ReadCookie } from "./cookieManager";
import { TokenStructure, User } from "../redux";
import jwt_decode from 'jwt-decode';

export const IsUserAuthenticated = (): boolean => {
    const userToken = ReadCookie('user');

    if (userToken !== null && userToken !== "") {
        const expires = new Date((jwt_decode(userToken) as TokenStructure).exp);
        return expires > new Date();
    }
    return false;
}

export const GetUserFromToken = (): User | null => {
    const userToken = ReadCookie('user');

    if (userToken !== null && userToken !== "") {
        const decodedToken: TokenStructure = jwt_decode(userToken);

        const result = {
            id: parseInt(decodedToken.Id),
            email: decodedToken.Email,
            firstName: decodedToken.FirstName,
            lastName: decodedToken.LastName,
            permissions: parseInt(decodedToken.Permissions),
            vacationDays: parseInt(decodedToken.VacationDays),
            workType: parseInt(decodedToken.WorkType),
        }
        return result as User;
    }

    return null;
}
