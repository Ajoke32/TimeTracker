import { ajax } from 'rxjs/ajax';

export function AjaxQuery<T>(query: string, variables: object, token: string | null = null) {

    return ajax<T>({
        url: "/graphql",
        // "http://localhost:5166/graphql"
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: {
            query,
            variables
        }
    })
}