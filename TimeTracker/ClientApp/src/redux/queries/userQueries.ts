import { AjaxQuery } from './query';
import { map } from 'rxjs';

export function UserLoginQuery(user: { email: string, password: string }) {
    //const token = useCurrentSelector((state) => state.user.token);

    interface Structure {
        data: {
            userQuery: {
                response: string
            }
        }
    }

    return AjaxQuery<Structure>(
        "query Login($user: UserLoginInputType!) {userQuery {response(user: $user)}}",
        { user: user }

    ).pipe(
        map(resp => {
            // TODO Handle Error
            return resp.response.data.userQuery.response;
        }),
        // catchError(error => {
        //     return of(error);
        // })
    );
}