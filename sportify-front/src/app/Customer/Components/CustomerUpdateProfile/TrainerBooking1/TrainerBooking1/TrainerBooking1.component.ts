import { Reviews } from '../../../../../Owner/ViewModels/Reviews';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { TStatus, IManageTBooking } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { compileNgModule } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from 'src/app/Shared/dialog-modal/dialog-modal.component';
import { IReview } from 'src/app/Customer/ViewModels/IReview';
import { ReviewsService } from 'src/app/Shared/Services/reviews.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-TrainerBooking1',
  templateUrl: './TrainerBooking1.component.html',
  styleUrls: ['./TrainerBooking1.component.css']
})
export class TrainerBooking1Component implements OnInit {
  id:number=0;
  constructor(private ManageBookingServ:MangeBookingService,public dialog: MatDialog,
    private toast:ToastrService,private reivewser:ReviewsService) {
    this.getAllBooking();

  }
  completedArray:Array<IManageTBooking> = [];
  ngOnInit() {

  }
   review:IReview={ID:0,RateMsg:"",RateValue:0,BookingID:0};
  AddReview(id:number,name:string){
    const dialogRef = this.dialog.open(DialogModalComponent, {
      data: {title:name, msg: "",rate:0},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        console.log(`Dialog Body: ${result.msg}`);
        console.log(`Dialog Rate: ${result.rate}`);
        this.review.RateMsg=result.msg;
        this.review.RateValue=result.rate;
        this.review.BookingID=id;
        this.reivewser.addTReview(this.review).subscribe(
          result=>{
            if(result.isSuccceed){
              this.toast.success(result.message)
              this.getAllBooking();
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
        console.log(`Dialog Body: ${result.msg}`);
        console.log(`Dialog Rate: ${result.rate}`);
        this.review.RateMsg=result.msg;
        this.review.RateValue=result.rate;
        this.review.BookingID=id;
        this.review.ID=reviewid;
        this.reivewser.updateTReview(this.review).subscribe(
          result=>{
            if(result.isSuccceed){
              this.toast.success(result.message)
              this.getAllBooking();
            }
          }
        )
      }
    });

  }
  getAllBooking(){
    this.ManageBookingServ.GetTBookingBasedonStatus([TStatus.Completed]).subscribe(
      (result)=>{
        if(result.isSuccceed){
              this.completedArray=result.data;
            console.log(this.completedArray[0]);
        }
      }
    )
  }
}
export interface Review{
  title:string,
  RateMsg:string,
  RateValue:number,
  BookingID:number,
}
