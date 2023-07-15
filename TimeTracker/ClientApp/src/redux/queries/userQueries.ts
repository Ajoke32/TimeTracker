import { AjaxQuery } from './query';
import {QueryStructure, User} from '../intrerfaces';
import { UserAddType } from '../types'
import { ReadCookie } from '../../utils';



export function UserLoginQuery(userData: { email: string, password: string }) {
    return AjaxQuery<QueryStructure<{ userQuery: { login: { code: number, message: string } } }>>(
        "query Login($user: UserLoginInputType!) {userQuery {login(user: $user) {message, code}}}",
        { user: userData }
    );
}

export function AddUserQuery(userData: UserAddType) {
    const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ userMutation: { create: number } }>>(
        "mutation AddUser($user: UserInputType!){ userMutation {create(user: $user)} }",
        { user: userData },
        token
    )
}

export function UserVerifyQuery(token: string) {
    return AjaxQuery<QueryStructure<{ userQuery: { verifyUser: boolean } }>>(
        "query VerifyUser($token: String!){ userQuery { verifyUser(token: $token) } }",
        { token: token },
    )
}

export function PasswordConfirmQuery(data:{token: string, password: string}) {
    return AjaxQuery<QueryStructure<{ userQuery: { verifyUser: boolean } }>>(
        `mutation Verify($token: String!, $password: String!){ userMutation {verifyUser(token: $token, password: $password)} }`,
        {
            token: data.token,
            password: data.password
        },
    )

}

export function FetchUsers(){

    return AjaxQuery<QueryStructure<{userQuery:{users:User[]}}>>(
      'query{userQuery{users{id,email,workType,firstName,lastName}}}'
    );
}
