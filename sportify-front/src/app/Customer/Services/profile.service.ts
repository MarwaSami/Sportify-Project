import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private http:HttpClient) { }

// data will ProfileImage , id  and PhoneNumber
updateProfile(data:FormData){
  data.forEach((value,key)=>{
    console.log(value,key);

  });

  return this.http.put("https://localhost:59528/UpdateProfile",data);

}

ChangePassword(data:any){
  return this.http.post("https://localhost:59528/changepassword",data)
}
}
