import { Component, OnInit } from '@angular/core';
import { BookingStatus, IManageBooking } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-booking2',
  templateUrl: './booking2.component.html',
  styleUrls: ['./booking2.component.css']
})
export class Booking2Component implements OnInit {

  constructor(private ManageBookingServ:MangeBookingService) { }
  cancelledArray:Array<IManageBooking> = []

  ngOnInit() {
   this.getAllBooking();
  }
  getAllBooking(){
    this.ManageBookingServ.GetBookingBasedonStatus([BookingStatus.Rejected]).subscribe(
      (result)=>{
        if(result.isSuccceed){
              this.cancelledArray=result.data;
        }
      }
    )
  }
}
