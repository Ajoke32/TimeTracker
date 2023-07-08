import { AjaxQuery } from './query';
import { QueryStructure, ResponseError } from '../intrerfaces';
import { UserAddType } from '../types'
import { ReadCookie } from '../../utils';


export function UserLoginQuery(userData: { email: string, password: string }) {
    return AjaxQuery<QueryStructure<{ userQuery: { login: string } }>>(
        "query Login($user: UserLoginInputType!) {userQuery {login(user: $user)}}",
        { user: userData }
    );
}

export function AddUserQuery(userData: UserAddType) {
    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ userMutation: { create: boolean } }>>(
        "mutation AddUser($user: UserInputType!){ userMutation {create(user: $user)} }",
        { user: userData },
        token
    )
}

