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
        "mutation AddUser($user: UserInputType!){ userMutation {create(user: $user)} }",
        { user: user },
        token
    )
}

/*
"user":{
    "email":"ipz211_bmm@student.ztu.edu.ua",
    "firstName":"Mykhailo",
    "lastName":"bekker",
    "password":"testmail",
    "workType":0,
    "permissions":4,
    "vacationDays":25,
    "hoursPerMonth":50
  }
  */