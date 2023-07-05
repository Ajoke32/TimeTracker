import { AjaxQuery } from './query';
import { ResponseError } from '../intrerfaces';


export function UserLoginQuery(user: { email: string, password: string }) {
    
   //const token = useTypedSelector((state) => state.user.token);

    interface Structure{
        data: { userQuery: { response: string }},
        errors:ResponseError[]|null,
    }
    return AjaxQuery<Structure>(
        "query Login($user: UserLoginInputType!) {userQuery {response(user: $user)}}",
        {user:user}
    );
}