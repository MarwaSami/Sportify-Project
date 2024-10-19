import { EditplaceService } from './../../Services/editplace.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormDataService } from '../../Services/form-data.service';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';

@Component({
  selector: 'app-owner-addplace-p1',
  templateUrl: './owner-addplace-p1.component.html',
  styleUrls: ['./../owner-addplace/owner-addplace.component.css', './owner-addplace-p1.component.css']
})
export class OwnerAddplaceP1Component implements AfterViewInit {
  BasicInfo: FormGroup;
  place: Iplace = this.Placser.setdefaultPlace();
  isedited: boolean = false;
  constructor(private Builder: FormBuilder, private setdata: FormDataService, private route: Router,
    private Placser: PlacesService, private EditService: EditplaceService) {
    this.EditService.GetPlaceId().subscribe(
      id => {
        if (id != -1) {
          this.isedited = true;
          this.Placser.getAllplaceByID(id).subscribe(
            result=>{
              if(result.isSuccceed)
              {
                this.place=result.data;
                  this.BasicInfo = this.Builder.group(
                    {
                      Name: [this.place.name, [Validators.required]],
                      Description: [this.place.description, [Validators.required]],
                      Capacity: [this.place.capacity, [Validators.required]],
                      PricePerhour: [this.place.pricePerhour, [Validators.required]],
                      TypeID: [this.place.typeID, [Validators.required]],
                      SurfaceID: [this.place.surfaceID, [Validators.required]]
                    }
                  );
                  this.viewType()
                  this.viewSurface();
                  console.log(result.data);
                  this.EditService.SetPlace(this.place)
              }
            }
          );
        }

      }
    )
    if (this.isedited) {
      this.BasicInfo = this.Builder.group(
        {
          Name: [this.place.name, [Validators.required]],
          Description: [this.place.description, [Validators.required]],
          Capacity: [this.place.capacity, [Validators.required]],
          PricePerhour: [this.place.pricePerhour, [Validators.required]],
          TypeID: [this.place.typeID, [Validators.required]],
          SurfaceID: [this.place.surfaceID, [Validators.required]]
        }
      );
      var TypeIDs = document.getElementsByClassName("TypeID");
    }
    else {
      this.BasicInfo = this.Builder.group(
        {
          Name: ['', [Validators.required]],
          Description: ['', [Validators.required]],
          Capacity: ['', [Validators.required]],
          PricePerhour: ['', [Validators.required]],
          TypeID: ['', [Validators.required]],
          SurfaceID: ['', [Validators.required]]
        }
      )
    }

  }

  send() {
    let Formdata:FormData=new FormData()
    Formdata.set('Description',this.BasicInfo.controls['Description'].value)
    Formdata.set('Name',this.BasicInfo.controls['Name'].value)
    Formdata.set('Capacity',this.BasicInfo.controls['Capacity'].value)
    Formdata.set('PricePerhour',this.BasicInfo.controls['PricePerhour'].value)
    Formdata.set('TypeID',this.BasicInfo.controls['TypeID'].value)
    Formdata.set('SurfaceID',this.BasicInfo.controls['SurfaceID'].value)
   if(this.isedited){
    Formdata.set('id',this.place.id.toString())
   }
    this.setdata.setFormData(Formdata)
    this.route.navigateByUrl('/Owner/addplace/P2')
  }


  ngAfterViewInit(): void {

  }


  viewType() {
    let elements = document.querySelectorAll("[data-name='Type']")
    //console.log("here");
    for (let i = 0; i < 3; i++) {
      console.log(i);
      let element = elements[i] as HTMLInputElement;
      if (element.value == this.place.typeID.toString()) {
        console.log(element.checked);
        element.checked=true;
        console.log(element.checked);
        break;
      }
    }
  }
  viewSurface() {
    let elements = document.getElementsByClassName("ISurface_id");
    for (let i = 0; i < 3; i++) {
      let element = elements[i] as HTMLInputElement;
      if (element.value == this.place.surfaceID.toString()) {
        element.checked = true;
        break;
      }
    }
  }
}
