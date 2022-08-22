export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    localId:string;
    expiresIn:string;
    registered?:boolean;
}