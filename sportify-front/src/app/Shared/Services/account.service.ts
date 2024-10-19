import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../ViewModels/APIResult';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
path:string= "https://localhost:59528/Account"

constructor(private http:HttpClient) { }


SignUp(data:any ){
  return this.http.post<APIResult<string>>(this.path+"/SignUp",data);
}
SignIn(data:any ){
  return this.http.post<APIResult<SignedinUser>>(this.path+"/SignIn",data);
}
}
export interface SignedinUser{
  token: string;
  roles: string[];
  picture:string;
  name:string
  massage:string
}

// "token": "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImYxNWQ5NGM1LTNjYTgtNDUzZC1iZjkyLWU2YmFlMjAxNTQ1ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik93bmVyIiwiZXhwIjoxNjk4NzQ3NzUyfQ.fDx-iqOAok6QCch6HJvsK9rRfHyRNyNAPFndBU5YF5D9mfAHyWGg03tIwr-J0qig",
//         "roles": [
//             "Owner"
//         ],
//         "picture": "Screenshot (32).png",
//         "name": "Ownerr",
//         "massage": null
