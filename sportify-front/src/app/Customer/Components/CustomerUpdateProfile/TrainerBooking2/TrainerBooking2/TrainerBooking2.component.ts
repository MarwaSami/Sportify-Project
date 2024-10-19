import { Component, OnInit } from '@angular/core';
import { TStatus, IManageBooking, IManageTBooking } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-TrainerBooking2',
  templateUrl: './TrainerBooking2.component.html',
  styleUrls: ['./TrainerBooking2.component.css']
})
export class TrainerBooking2Component implements OnInit {

  constructor(private ManageBookingServ:MangeBookingService) { }
  cancelledArray:Array<IManageTBooking> = []

  ngOnInit() {
   this.getAllBooking();
  }
  getAllBooking(){
    this.ManageBookingServ.GetTBookingBasedonStatus([TStatus.Rejected]).subscribe(
      (result)=>{
        if(result.isSuccceed){
              this.cancelledArray=result.data;
        }
      }
    )
  }
}
