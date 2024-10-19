import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '../../Services/form-data.service';
import { Router } from '@angular/router';
import { EditplaceService } from '../../Services/editplace.service';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-addplace-p4',
  templateUrl: './owner-addplace-p4.component.html',
  styleUrls: ['./owner-addplace-p4.component.css', '../owner-addplace/owner-addplace.component.css']
})
export class OwnerAddplaceP4Component {
  locationForm: FormGroup;
  errorvalue: string = '';
  optionid: number = 0;
  display: any;
  // place
  place: Iplace = this.Placser.setdefaultPlace();
  isedited: boolean = false;
  center: google.maps.LatLngLiteral = {
    lat: this.place.lat,
    lng: this.place.lang
  };
  marker = {
    position: this.center,
  }
  constructor(private Builder: FormBuilder, private setdata: FormDataService, private route: Router,
    private Placser: PlacesService, private EditService: EditplaceService
    ,private toast:ToastrService) {
    this.EditService.GetPlaceId().subscribe(
      id => {
        if (id != -1) {
          this.isedited = true
          this.Placser.getAllplaceByID(id).subscribe(
            result => {
              if (result.isSuccceed) {
                this.place = result.data
                this.locationForm = this.Builder.group(
                  {
                    City: [this.place.city],
                    Street: [this.place.street]
                  }
                )
                this.center = {
                  lat: this.place.lat,
                  lng: this.place.lang
                };
              }
            }
          );
          this.optionid = 3;
        }

      }
    )
    this.locationForm = this.Builder.group(
      {
        City: [this.place.city],
        Street: [this.place.street]
      }
    )
    this.center = {
      lat: this.place.lat,
      lng: this.place.lang
    };

  }
  zoom = 8;
  send() {
    let dataform: FormData = new FormData();
    switch (this.optionid) {
      case 1: {
        if (this.locationForm.controls['City'].value != '' && this.locationForm.controls['Street'].value != '') {
          dataform.append('City', this.locationForm.controls['City'].value);

          dataform.append('Street', this.locationForm.controls['Street'].value)
          dataform.append('Lang', "0");
          dataform.append('Lat', "0")
          this.setdata.setFormData(dataform);
        }
        else {
          this.errorvalue = 'You must valid Address'
        }
      } break;
      case 0:
        {
          this.errorvalue = 'You must valid location'
        }
        break;
      case 2: {
        if (this.center.lng != 0 && this.center.lat != 0) {
          dataform.append('City', '');

          dataform.append('Street', '')
          dataform.append('Lang', this.center.lng.toString());
          dataform.append('Lat', this.center.lat.toString())
          this.setdata.setFormData(dataform);
        }
        else {
          this.errorvalue = 'You must click on map to get position'
        }
      } break;
      case 3: {
        if ((this.center.lng != 0 && this.center.lat != 0) || (this.locationForm.controls['City'].value != '' && this.locationForm.controls['Street'].value != '')) {
          dataform.append('City', this.locationForm.controls['City'].value);

          dataform.append('Street', this.locationForm.controls['Street'].value)
          dataform.append('Lang', this.center.lng.toString());
          dataform.append('Lat', this.center.lat.toString())
          this.setdata.setFormData(dataform);
        }
        else {
          this.errorvalue = 'You must valid location'
        }
      } break;

    }
    if (this.isedited && this.optionid != 0) {
      this.setdata.updatePlace().subscribe(
       {
        next:(Respon)=>{
          if(Respon.isSuccceed){
            this.toast.success(Respon.message,"Successfully Updated")
            this.EditService.Editplace(-1);
            this.route.navigateByUrl('/Owner/myplaces')
          }
          else{
            this.toast.warning(Respon.message,"Error Occur")
            this.route.navigateByUrl('/Owner/addplace/P1')
          }
        },
        error:(Resonse)=>{
          this.toast.error(Resonse,"Error Occur")
          this.route.navigateByUrl('/Owner/addplace/P1')
        }
       }
      );
    }
    else if (this.optionid != 0) {
      this.setdata.addPlace().subscribe(
        {
         next:(Respon)=>{
           if(Respon.isSuccceed){
             this.toast.success(Respon.message,"Successfully Added")
             this.route.navigateByUrl('/Owner/myplaces')
           }
           else{
             this.toast.warning(Respon.message,"Error Occur")
             this.route.navigateByUrl('/Owner/addplace/P1')
           }
         },
         error:(Resonse)=>{
           this.toast.error(Resonse,"Error Occur")
           this.route.navigateByUrl('/Owner/addplace/P1')
         }
        }
       );;
    }
  }
  option(e: any) {
    if (e.target.checked) {
      if (this.optionid == 0)
        this.optionid = parseInt(e.target.id);
      else
        this.optionid += parseInt(e.target.id);
    }
    else {
      if (this.optionid == e.target.id)
        this.optionid = 0;
      else
        this.optionid -= parseInt(e.target.id);
    }
  }
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
    //(mapMousemove)="move($event)"
  }


}
