import { AjaxQuery } from './query';
import { ResponseError, User } from '../intrerfaces';
import { GetDecodedToken } from '../../utils';


export function UserLoginQuery(user: { email: string, password: string }) {
    interface Structure {
        data: { userQuery: { login: string } },
        errors: ResponseError[] | null,
    }

    return AjaxQuery<Structure>(
        "query Login($user: UserLoginInputType!) {userQuery {login(user: $user)}}",
        { user: user }
    );
}

export function AddUserQuery(user: User) {
    interface Structure {
        data: { userQuery: { create: User } },
        errors: ResponseError[] | null,
    }

    const token = GetDecodedToken();
}