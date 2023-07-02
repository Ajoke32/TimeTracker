import { ajax } from 'rxjs/ajax';

export function AjaxQuery<T>(query: string, variables: object, token: string | null = null) {

    return ajax<T>({
        url: "http://localhost:5166/graphql", // "http://localhost:5166/graphql"
        //https:/timetrackerproj.azurewebsites.net/graphql
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            query,
            variables
        }
    })
}