import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../Shared/Services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  selectedRole='';
  constructor(private formBuilder: FormBuilder, private router: Router, private AccServ: AccountService, private toaster: ToastrService) {
    this.signupForm = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Role: new FormControl("Customer")
    });
  }
  ngOnInit() {
    this.selectedRole = '';
    // this.signupForm = new FormGroup({
    //   Role: new FormControl('')
    // });
  }

  selectRole(role: string) {
    event?.preventDefault();
    this.selectedRole = role;
    this.signupForm.controls["Role"].setValue(role);
  }

  onSubmit(): void {
   // this.signupForm.controls["Role"].setValue("Admin");
    console.log(this.signupForm.value);
    this.AccServ.SignUp(this.signupForm.value).subscribe({
      next: (response) => {
        console.log(response);
        let url = "";

        if (response.isSuccceed === true) {
          // if (localStorage.getItem("role") === "1") {
          //   url = '/Customer/home';
          // } else if (localStorage.getItem("role") === "2") {
          //   url = '/Owner';
          // } else if (localStorage.getItem("role") === "3") {
          //   url = '/Trainer';
          // } else {
          //   url = '/Admin';
          // }
          this.toaster.success("Sucessfully Register");
          this.router.navigate([`signin`, url]);
        } else {
          this.toaster.info(response.message, "Something went wrong");
        }
      }
    });
  }
}
