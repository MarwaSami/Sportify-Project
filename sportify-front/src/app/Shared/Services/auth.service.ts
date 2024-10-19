import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { role } from '../ViewModels/role';

@Injectable(
  {
    providedIn:"root"
  }
)
export class AuthService {
loggedSubject: BehaviorSubject<LoggedUser|null>
constructor() {
  this.loggedSubject = new BehaviorSubject<LoggedUser|null>(this.getCurrentUser())
}
getCurrentUser():LoggedUser|null{
  if(localStorage.getItem("token")!= null){
    let current:LoggedUser ={Id:0,Name:"",img:"",token:"",role:role.Customer}
    current.role=  localStorage.getItem("role")=="2"?role.Owner: localStorage.getItem("role")=="0"?role.Admin:localStorage.getItem("role")=="3"?role.Trainer:role.Customer;
    current.token =  localStorage.getItem("token")??""
    return current
  }
  else{
    return null
  }
}

}

export interface LoggedUser{
  Id:number
  Name: string
  token:string
  role: role
  img:string
}
