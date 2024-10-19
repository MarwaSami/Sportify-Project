import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';
import { AccountService } from '../Shared/Services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-SignIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.css']
})
export class SignInComponent implements OnInit {
    signinForm = this.formBuilder.group({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    IsRemembered : new FormControl(true)
});
returnedUrl :string ="/"
  constructor(private AccServ:AccountService, private toaster:ToastrService,
    private formBuilder: FormBuilder, private ActivateRoute:ActivatedRoute,private router:Router, private authServ :AuthService) {
    this.ActivateRoute.params.subscribe(prams=>{
      if(prams['returnedUrl']==''||prams['returnedUrl']=='/')
      {

      }else{
        this.returnedUrl = prams['returnedUrl']
      }
    })
  }

  ngOnInit() {
  }
  onSubmit(): void {
    console.log(this.signinForm.value);
    this.AccServ.SignIn(this.signinForm.value).subscribe({
      next:(responce)=>{
        console.log(responce)
        if(responce.isSuccceed==true){
          this.toaster.success(responce.message,"successfully Sign In")
          localStorage.setItem("token",responce.data.token)
          localStorage.setItem("role",this.check(responce.data.roles[0]))
          this.authServ.loggedSubject.next(this.authServ.getCurrentUser())
          if(this.check(responce.data.roles[0])=="1"){
            this.returnedUrl="/"
          }
          else if(this.check(responce.data.roles[0])=="2"){
            this.returnedUrl="/Owner"
          }
          else if(this.check(responce.data.roles[0])=="3"){
            this.returnedUrl="/Trainer"
          }
          else{
            this.returnedUrl="/Admin"
          }
          this.router.navigateByUrl(this.returnedUrl)
        }
        else{
          this.toaster.warning(responce.message)

        }
      }
    })
   }

   check(role:string):string{
    if(role==="Owner")
    return "2"
    if(role==="Customer")
    return "1"
    if(role==="Trainer")
    return "3"
    else
    return "0"
   }
}


