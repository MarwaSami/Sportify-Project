import { Toast, ToastrService } from 'ngx-toastr';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { Component } from '@angular/core';
import { EditplaceService } from '../../Services/editplace.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { IOwnerPlaceDetail, IPlaceDetail } from 'src/app/Customer/ViewModels/IPlaceDetail';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { BookingStatus } from 'src/app/Customer/ViewModels/IManageBooking';
import { IReservations } from '../../ViewModels/IReservations';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent {
  placeName: string = "";
  cateName: string = "";
  id:number=0;
  place: IOwnerPlaceDetail = this.placeser.getownerPlace();
  constructor(private editervice: EditplaceService, private route: Router, private rou: ActivatedRoute,
    private placeser: PlacesService,private Toast:ToastrService,
    private reservationServ: MangeBookingService, private cateser: CategoriesService) {
    this.rou.params.subscribe(
      (param) => {
        if (param["id"] != null) {
          console.log(param["id"]);
          this.id=parseInt(param["id"]);
          this.getplacedata(this.id);

        }
      }
    )
  }
  Edit(Id: number) {
    this.editervice.Editplace(Id);
    setTimeout(
      () => {
        this.route.navigateByUrl("/Owner/addplace")
      }
    )
  }
  confirmBooking(id: number) {
    console.log(id);
    this.updateStatus(id, BookingStatus.Confirmed);
  }
  completeBooking(id: number) {
    console.log(id);
    this.updateStatus(id,  BookingStatus.Completed);
  }
  updateStatus(id: number, status: BookingStatus) {
    this.reservationServ.UpdateBookingStatus(id, status).subscribe(
      result => {
        if (result.isSuccceed) {
          this.getplacedata(this.id);
          this.Toast.success("Booking is successfully updated")
        }
      }
    )
  }
 getplacedata(id:number){
  this.placeser.OwnerGetPlaceByID(id).subscribe(
    result => {
      console.log(result)
      if (result.isSuccceed) {
        this.place= result.data
        console.log(this.place);
        // this.place.bookings.forEach(
        //   val=>{
        //     console.log(val.name);

        //   }
        // )
      }
    }
  );
 }
}
