import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.formBuilder.group({
    emailAddress: new FormControl('AmmH', [Validators.required]),
});   
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(): void {
    console.log("Forgot Password success"+this.forgotPasswordForm.value.emailAddress);
}
}
