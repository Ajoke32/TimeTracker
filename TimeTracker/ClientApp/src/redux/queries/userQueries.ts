import { AjaxQuery } from './query';
import { QueryStructure, ResponseError, User } from '../intrerfaces';
import { ReadCookie } from '../../utils';


export function UserLoginQuery(user: { email: string, password: string }) {
    return AjaxQuery<QueryStructure<{ userQuery: { login: string } }>>(
        "query Login($user: UserLoginInputType!) {userQuery {login(user: $user)}}",
        { user: user }
    );
}

export function AddUserQuery(user: User) {

    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ userMutation: { create: boolean } }>>(
        "", // mutation AddUser($user: UserInputType!){ userMutation { create(user: $user) { firstName } }}
        { user: user },
        token
    )
}