import { Reviews } from './../../../../../Owner/ViewModels/Reviews';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { BookingStatus, IManageBooking, IManageTBooking } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { compileNgModule } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from 'src/app/Shared/dialog-modal/dialog-modal.component';
import { IReview } from 'src/app/Customer/ViewModels/IReview';
import { ReviewsService } from 'src/app/Shared/Services/reviews.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking1',
  templateUrl: './booking1.component.html',
  styleUrls: ['./booking1.component.css']
})
export class Booking1Component implements OnInit {
  id:number=0;
  constructor(private ManageBookingServ:MangeBookingService,public dialog: MatDialog,
    private toast:ToastrService,private reviewser:ReviewsService) {
    this.getAllBooking();

  }
  completedArray:Array<IManageBooking> = [];
  ngOnInit() {

  }
   review:IReview={ID:0,RateMsg:"",RateValue:0,BookingID:0};
  AddReview(id:number,name:string){
    const dialogRef = this.dialog.open(DialogModalComponent, {
      data: {title:name, msg: "",rate:0},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        console.log(`Message: ${result.msg}`);
        console.log(`Rate: ${result.rate}`);
        this.review.RateMsg=result.msg;
        this.review.RateValue=result.rate;
        this.review.BookingID=id;
        this.reviewser.addPReview(this.review).subscribe(
          result=>{
            if(result.isSuccceed){
              this.toast.success(result.message)
            }
          }
        )
      }
    });

  }
  UpdateReview(id:number,name:string,reviewid:number){
    const dialogRef = this.dialog.open(DialogModalComponent, {
      data: {title:name, msg: "",rate:0},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        console.log(`Message: ${result.msg}`);
        console.log(`Rate: ${result.rate}`);
        this.review.RateMsg=result.msg;
        this.review.RateValue=result.rate;
        this.review.BookingID=id;
        this.review.ID=reviewid;
        this.reviewser.updatePReview(this.review).subscribe(
          result=>{
            if(result.isSuccceed){
              this.toast.success(result.message)

            }
          }
        )
      }
    });

  }
  getAllBooking(){
    this.ManageBookingServ.GetBookingBasedonStatus([BookingStatus.Completed]).subscribe(
      (result)=>{
        if(result.isSuccceed){
              this.completedArray=result.data;
            console.log(this.completedArray[0]);
        }
      }
    )
  }
}
