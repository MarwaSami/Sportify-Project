import { Component, VERSION } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,FormControl,Validators,} from '@angular/forms';
import { ProfileService } from 'src/app/Customer/Services/profile.service';

@Component({
  selector: 'app-Info',
  templateUrl: './Info.component.html',
  styleUrls: ['./Info.component.css']
})
export class InfoComponent {
  form!: FormGroup ;
  imgSource = '';
  formData: FormData = new FormData();
  constructor(private formBuilder: FormBuilder, private ProfileServ:ProfileService) {
    this.imgSource = "../assets/images/ProfileUpdate/register-form.png";
    this.form = this.formBuilder.group(
      {
        PhoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
      },
    );
   }

  ngOnInit(): void {

  }
  onFileChange(event: any) {
    console.log('Image Changed', event);
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      console.log('Profile Saved', file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event: any) => {
        this.imgSource = _event.target?.result;
      }
      this.formData.append("ProfileImage", <File>file)
    }
  }
  onSubmit(): void {
    // this.submitted = true;
    for (const key in this.form.controls) {
      this.formData.append(key, this.form.controls[key].value)
    }


    this.ProfileServ.updateProfile(this.formData).subscribe({
      next:(response)=>{
        console.log(response);
      }
    })


  }
  onReset(): void {
    // this.submitted = false;
    this.form.reset();
  }

}
