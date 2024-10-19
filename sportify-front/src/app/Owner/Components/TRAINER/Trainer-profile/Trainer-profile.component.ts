import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingFilterService } from 'src/app/Customer/Services/Training-Filter.service';
import { ITrainerCard } from 'src/app/Customer/ViewModels/ITrainer-Filter';

import { TrainerService } from '../services/trainer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Trainer-profile',
  templateUrl: './Trainer-profile.component.html',
  styleUrls: ['./Trainer-profile.component.css']
})

export class TrainerProfileComponent implements OnInit {
  imgSource = '';
  CategoryID: number = 0;
  SurfaceID: number = 0
  trainer!: ITrainerCard;
  profileForm!: FormGroup;
  isloading = true;
  constructor(private formBuilder: FormBuilder,
    private toaster:ToastrService, private trainSer: TrainingFilterService) {
    this.imgSource = "../assets/images/ProfileUpdate/register-form.png";
  }
  ngOnInit() {

    this.GetProfileData()
  }
  GetProfileData() {
    this.trainSer.get().subscribe((data) => {
      console.log(data);
      this.CategoryID = data.categoryID;
      this.SurfaceID = data.surfaceID;
      this.profileForm = this.formBuilder.group({
        UserName: new FormControl(data.userName, []),
        JobTitle: new FormControl(data.jobTitle, [Validators.required]),
        Description: new FormControl(data.description, [Validators.required]),
        PhoneNumber: new FormControl(data.phoneNumber, []),
        City: new FormControl(data.city, []),
        Email: new FormControl(data.email, [Validators.email]),
        CategoryID: new FormControl(data.categoryID, []),
        SurfaceID: new FormControl(data.surfaceID, []),
        PricePerSession: new FormControl(data.pricePerSession, []),
        CurrentPassword: new FormControl(data.currentPassword, []),
        NewPassword: new FormControl(data.newPassword, []),
      });
      this.isloading = false
    })

  }


  formData: FormData = new FormData();

  onSubmit(): void {
    for (const key in this.profileForm.controls) {
      this.formData.append(key, this.profileForm.controls[key].value)
    }
    this.isloading = true
    this.trainSer.update(this.formData).subscribe({
      next: (res) => {
        this.toaster.success("It is Successfully updated")
        this.GetProfileData()
      },
      error: (msg) => {
        this.isloading = false
      }
    })
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
  choosesurface(id: number) {
    console.log("Choose Surface", id);
    this.profileForm.controls["SurfaceID"].setValue(id)
  }
  chooseCategory(id: number) {
    console.log("choose Category", id);
    this.profileForm.controls["CategoryID"].setValue(id)

  }





}
