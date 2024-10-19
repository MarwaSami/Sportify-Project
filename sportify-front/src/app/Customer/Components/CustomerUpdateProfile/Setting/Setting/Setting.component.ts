import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/Customer/Services/profile.service';


@Component({
  selector: 'app-Setting',
  templateUrl: './Setting.component.html',
  styleUrls: ['./Setting.component.css']
})
export class SettingComponent implements OnInit {
  form: FormGroup = new FormGroup({
    OldPassword: new FormControl(''),
    NewPassword: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private ProfileServ: ProfileService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        OldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        NewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      }
      ,
    )
      ;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {

    }
    console.log(this.form.value);

    this.ProfileServ.ChangePassword(this.form.value).subscribe({
      next:(response)=>{
        console.log(response);
      }
    })

    console.log(JSON.stringify(this.form.value, null, 2));
  }
}

