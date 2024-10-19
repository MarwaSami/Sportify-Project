import { Component, OnInit } from '@angular/core';
import { BookingStatus, IManageBooking } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { compileNgModule } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking3',
  templateUrl: './booking3.component.html',
  styleUrls: ['./booking3.component.css']
})
export class Booking3Component implements OnInit {

  constructor(private ManageBookingServ: MangeBookingService, private route:Router
    ,private toast:ToastrService) {
    this.getAllBooking();
   }
  upcommingArray: Array<IManageBooking> = []


  ngOnInit() {

  }
  CancelBooking(index: number) {
    this.updateStatus(index,BookingStatus.Rejected)

  }
  getAllBooking(){
    this.ManageBookingServ.GetBookingBasedonStatus([BookingStatus.Pending,BookingStatus.Confirmed]).subscribe(
      (result)=>{
        if(result.isSuccceed){
              this.upcommingArray=result.data;
            console.log(this.upcommingArray[0]);
        }
      }
    )
  }
  updateStatus(id:number,status:BookingStatus){
    this.ManageBookingServ.UpdateBookingStatus(id,status).subscribe(
    result=>{
      if(result.isSuccceed){
        this.toast.success("Successfully updated")
        this.getAllBooking();
      }
      else{
        this.toast.warning(result.message)
      }
    }

    )
  }
  gotoPFilter(){
    this.route.navigateByUrl('/Customer/PFilter');
  }
}
