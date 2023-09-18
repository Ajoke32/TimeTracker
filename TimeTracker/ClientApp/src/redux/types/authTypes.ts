
interface GoogleAccessToken {
    accessToken:string,
    expiresIn:number,
    scope:string,
    tokenType:string
}

interface GoogleIdToken{
    aud:string,
    azp:string,
    email:string,
    email_verified:boolean,
    exp:number,
    hd:string,
    iat:number,
    iss:string,
    jti:string,
    nbf:number,
    nonce:string,
    sub:string
}