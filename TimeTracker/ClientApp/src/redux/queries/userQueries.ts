import { AjaxQuery } from './query';


export function UserLoginQuery(user: { email: string, password: string }) {
    
   // const token = useCurrentSelector((state) => state.user.token);



    interface ResponseError{
        message:string,
        extensions:{
            code:string
        }
    }
    interface Structure{
        data: { userQuery: { response: string }},
        errors:ResponseError[]|null,
    }
    return AjaxQuery<Structure>(
        "query Login($user: UserLoginInputType!) {userQuery {response(user: $user)}}",
        {user:user}
    );
}