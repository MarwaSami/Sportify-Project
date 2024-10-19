import { EditplaceService } from './../../Services/editplace.service';
import { FacilitesService } from './../../../Shared/Services/facilites.service';
import { Component, Input } from '@angular/core';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { IFacilities } from 'src/app/Shared/ViewModels/IFacilities';
import { Router } from '@angular/router';
import { IMYPlace } from '../../ViewModels/IMyPlace';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.css']
})
export class CardBodyComponent {
  @Input() Pitch:IMYPlace
  constructor(private toaster:ToastrService,
    private placese:PlacesService,private facilitesService: FacilitesService, private editervice: EditplaceService, private route: Router) {
    this.Pitch = {
      id: 0,
      name: "",
      pricePerHour: 0,
      rateValue:0,
      facilities: [],
      attachments: []
    };
  }
  Edit(Id: number) {
    this.editervice.Editplace(Id);
    setTimeout(
      () => {
        this.route.navigateByUrl("/Owner/addplace")
      }, 1000
    )
  }
  Remove(Id:number){
  this.placese.RemovePlace(Id).subscribe(
    res=>{
      if(res.isSuccceed){
        this.toaster.success("Remove placed Successfully");
        this.route.navigateByUrl('/Owner');
      }
    }
  );
  }
}
