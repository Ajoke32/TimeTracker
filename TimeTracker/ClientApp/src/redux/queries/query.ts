import { ajax } from 'rxjs/ajax';

export function AjaxQuery<T>(storage:string, query: string) {

    return ajax<T>({
        url: "https://localhost:7193/graphql", // "https:/timetrackerproj.azurewebsites.net/graphql"
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Storage-Type': storage
        },
        body: JSON.stringify({
            query: query
        })
    })
}