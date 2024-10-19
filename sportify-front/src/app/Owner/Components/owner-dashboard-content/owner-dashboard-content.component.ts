import { count } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CountService } from 'src/app/Shared/Services/count.service';
import { ICount } from '../../ViewModels/ICount';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { IReservations, ITrainerReservations } from '../../ViewModels/IReservations';
import { IBookingFilter } from '../../ViewModels/IBookingFilter';
import { BookingStatus } from 'src/app/Customer/ViewModels/IManageBooking';
import { TrainerBookingService } from 'src/app/Customer/Services/TrainerBooking.service';

@Component({
  selector: 'app-owner-dashboard-content',
  templateUrl: './owner-dashboard-content.component.html',
  styleUrls: ['./owner-dashboard-content.component.css']
})
export class OwnerDashboardContentComponent implements OnInit {
  count:ICount={
    bookings:0,
    customers:0,
    earnings:0
  };
  reservations: Array<IReservations> = [];
  Tresrvations:Array<ITrainerReservations>=[];
  role:string="";
  reslength:number=0;
  places:number=0;
  constructor(private countService:CountService,private trainerserv:TrainerBookingService
    ,private reservationServ: MangeBookingService) {
    this.role=localStorage.getItem("role")!;
      this.getALL();
      this.getReservation();

   }
   getReservation() {
    if(localStorage.getItem("role")=="2"){
    this.reservationServ.getLatestthreeBooking().subscribe(
      result => {
        if (result.isSuccceed) {
          this.reservations = result.data;
          console.log(this.reservations);
          // this.reservations=this.reservations.slice(Math.max(this.reservations.length -3, 0));
          // console.log(this.reservations);

        }
      }
    )
    }
    else{
      this.trainerserv.GetTrainerLatestBooking().subscribe(
        res=>{
          if(res.isSuccceed){
            console.log(res.data);
            this.Tresrvations=res.data

        }
       }
     )
    }
  }

  ngOnInit() {
  }
  getALL(){
    if(localStorage.getItem("role")=="3"){
    this.countService.GetALLForTrainerCount().subscribe(res=>{
      console.log(res);
      this.count=res;
    })
  }
  else{
    this.countService.GetALLForOwnerCount().subscribe(
      res=>{
        this.count=res;
      }
    )
    this.countService.GetPlacesForOwnerCount().subscribe(
      res=>{
        this.places=res.data;}
    )
  }
  }
  resetUserFilter(): IBookingFilter {
    console.log(new Date().toJSON().split("T")[0]);

    return {
      PlaceName: "",
      Price: 0,
      date: new Date().toJSON().split("T")[0],
      Status: BookingStatus.Pending
    }
  }
}
