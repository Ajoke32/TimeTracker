import {AjaxQuery} from "@redux/queries/query.ts";


export function AuthorizeWithGoogleQuery(email:string){
    return AjaxQuery<{userQuery:{googleAuth:string}}>(
        `query Auth($email:String!){
          userQuery{
            googleAuth(email:$email)
          }
        }`,
        {email:email}
    )
}