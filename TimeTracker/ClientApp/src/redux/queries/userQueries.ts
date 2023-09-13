import { AjaxQuery } from './query';
import { User } from '../intrerfaces';
import { UserAddType, FetchUsersType } from '../types'
import { ReadCookie } from '../../utils';
import {user} from "@redux/slices";

export function UserLoginQuery(userData: { email: string, password: string }) {
  return AjaxQuery<{ userQuery: { login: string } }>(
    "query Login($user: UserLoginInputType!) {userQuery {login(user: $user)}}",
    { user: userData }
  );
}

export function AddUserQuery(userData: UserAddType) {
  const token = ReadCookie('user');

  return AjaxQuery<{ userMutation: { create: User } }>(
    `mutation AddUser($user: UserInputType!) {
          userMutation {
            create(user: $user) {
              id
              email
              firstName
              lastName
              permissions
              vacationDays
              workType
              hoursPerMonth
            } 
          }
        }`,
    { user: userData },
    token
  )
}

export function PasswordConfirmQuery(data: { token: string, password: string }) {
  const { token, password } = data;
  return AjaxQuery<{ userMutation: { verifyUser: boolean } }>(
    `mutation Verify($token: String!, $password: String!) {
            userMutation {
              verifyUser(token: $token, password: $password)
            }
          }`,
    {
      token: token,
      password: password
    },
  )
}

export function FetchUsersQuery(data: FetchUsersType) {
  const { take, skip, group,orderBy,userId } = data;
  return AjaxQuery<{ userQuery: { users: User[] } }>(
    `query GetUsers($take: Int, $skip: Int,$group:[Where]!,$orderBy:OrderBy){
      userQuery{
          users(group:$group,
                take:$take,skip:$skip,orderBy:$orderBy){
               id
                email
                workType
                firstName
                lastName
                isEmailActivated
                vacationDays
                hoursPerMonth
        }
      }
    }`,
    {
      take: take,
      skip: skip,
      group:[...group,{property:"Id",operator:"neq",value:userId.toString(),connector:"and"}],
      orderBy:orderBy.property!==""?orderBy:null
    },
  );
}


export function FetchUserQuery(userId: number) {
  return AjaxQuery<{ userQuery: { user: User } }>(
    `query GetUser($userId: Int!) {
            userQuery {
              user(id: $userId) {
                id
                email
                workType
                firstName
                lastName
                isEmailActivated
                vacationDays
                hoursPerMonth
                permissions
              }
            }
          }`,
    {
      userId: userId
    },
  );
}

export function EditUserQuery(user: User) {
  const token = ReadCookie('user');

  return AjaxQuery<{ userMutation: { update: boolean } }>(
    `mutation EditUser($user: UpdateUserInputType!) {
        userMutation {
          update(user: $user) 
        }
      }`,
    { user: user },
    token
  )
}

export function FetchUserVacationDays(id:number){
    return AjaxQuery<{ userQuery:{user:{vacationDays:number}} }>(
        'query FetchUserVacationDays($id:Int!){userQuery{user(id:$id){vacationDays}}}',
        {id:id}
    )
}

export function DeleteUser(id:number){
    return AjaxQuery<{ userMutation:{deleteById:number} }>(
        'mutation DeleteUser($id:Int!){userMutation{deleteById(id:$id)}}',
        {id:id}
    )
}

export function EmailConfirmQuery(token: string) {
  return AjaxQuery<{ userMutation: { verifyUser: boolean } }>(
    `mutation emailVerify($token: String!) {
            userMutation {
              verifyEmail(token: $token)
            }
          }`,
    {
      token: token
    },
  )
}

export function RefreshTokenQuery(userId:number){
    return AjaxQuery<{userQuery:{refreshToken:string}}>(
        `
            query RefreshToken($userId:Int){
              userQuery{
                refreshToken(userId:$userId)
              }
            }
        `,
        {
            userId:userId
        }
    )
}