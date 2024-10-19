import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ProfileUpdate',
  templateUrl: './ProfileUpdate.component.html',
  styleUrls: ['./ProfileUpdate.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  imgSource = '';
  profileForm = this.formBuilder.group({
    profileImage: new FormControl(null, [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    description:new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required]),
    taxRegister: new FormControl('', [Validators.required]),
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder) {
    this.imgSource = "../assets/images/ProfileUpdate/register-form.png";
  }
  ngOnInit() {
  }
  onSubmit(): void {
    const formData = new FormData();
    let img = this.profileForm.get('ProfileImage')?.value;

    if (img)
      formData.append('ProfileImage', img);

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
    }
  }
}
