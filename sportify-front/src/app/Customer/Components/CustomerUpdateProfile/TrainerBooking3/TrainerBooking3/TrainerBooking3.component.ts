import { Component, OnInit } from '@angular/core';
import { TStatus, IManageTBooking } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { compileNgModule } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-TrainerBooking3',
  templateUrl: './TrainerBooking3.component.html',
  styleUrls: ['./TrainerBooking3.component.css']
})
export class TrainerBooking3Component implements OnInit {

  constructor(private ManageBookingServ: MangeBookingService,private router:Router
    ,private toast:ToastrService) {
    this.getAllBooking();
   }
  upcommingArray: Array<IManageTBooking> = []


  ngOnInit() {

  }
  CancelBooking(index: number) {
    this.updateStatus(index,TStatus.Rejected)

  }
  getAllBooking(){
    this.ManageBookingServ.GetTBookingBasedonStatus([TStatus.Pending,TStatus.Confirmed]).subscribe(
      (result)=>{
        if(result.isSuccceed){
              this.upcommingArray=result.data;
            console.log(this.upcommingArray[0]);
        }
      }
    )
  }
  updateStatus(id:number,status:TStatus){
    this.ManageBookingServ.UpdateTBookingStatus(id,status).subscribe(
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
  gotoTFilter(){
  this.router.navigateByUrl('/Customer/TFilter')
  }
}
