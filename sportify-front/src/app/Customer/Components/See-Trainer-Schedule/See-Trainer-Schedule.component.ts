import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrainerDetail } from '../../ViewModels/ITrainer-Filter';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { TrainerService } from 'src/app/Shared/Services/trainer.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from 'src/app/Shared/dialog-modal/dialog-modal.component';
import { BookingStatus, TStatus } from '../../ViewModels/IManageBooking';
import { ITAddBooking } from '../../ViewModels/IAddBooking';
import { TDialogModalComponent } from 'src/app/Shared/dialog-modal -Tainer/Tdialog-modal.component';
import { MangeBookingService } from '../../Services/MangeBooking.service';
import { ToastrService } from 'ngx-toastr';
import { Time } from '@angular/common';
@Component({
  selector: 'app-See-Trainer-Schedule',
  templateUrl: './See-Trainer-Schedule.component.html',
  styleUrls: ['./See-Trainer-Schedule.component.css']
})

export class SeeTrainerScheduleComponent implements AfterViewInit{
  placeName: string = "";
  cateName: string = "";

  trainer: ITrainerDetail = this.trainerservice.getownerTrainer();
  constructor( private route: Router, private rou: ActivatedRoute,private toast:ToastrService,
    public dialog: MatDialog,private trainerservice:TrainerService,private bookser:MangeBookingService
      ,private cateser: CategoriesService) {
    this.rou.params.subscribe(
      (param) => {
        if (param["id"] != null) {
          console.log(param["id"]);
          this.trainerservice.CustomerShowTrainerDetails(param["id"]).subscribe(
            result => {

              console.log(result)

              this.trainer= result

            }
          );

        }
      }
    )
  }
  addBook:ITAddBooking=this.resetaddboookin();
  AddBooking(item:any){
    this.addBook.Day=item.day;
    console.log((item.startTime as string).split('T')[1]);
    const dialogRef = this.dialog.open(TDialogModalComponent, {
      data: {StartTime:(item.startTime as string).split('T')[1], EndTime:(item.endTime as string).split('T')[1],TotalPrice:this.trainer.pricePerSession,date:item.day},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        console.log(`Dialog StartTime: ${result.StartTime}`);
        console.log(`Dialog EndTime: ${result.EndTime}`);
        console.log(`Dialog TotalPrice: ${result.TotalPrice}`);

        this.addBook.StartTime=result.StartTime;
        this.addBook.EndTime=result.EndTime;
        this.addBook.TotalPrice=parseInt(result.TotalPrice);
        this.addBook.TrainerId=this.trainer.id;
        this.addBook.status=TStatus.Pending;
        console.log(this.addBook);
        //send data to request
        this.bookser.AddTBooking(this.addBook).subscribe(
          res=>{
            if(res.isSuccceed){
              this.toast.success("Successfully booked");
            }
          }
        )

      }
    });
  }
  ngAfterViewInit(): void {
  }
   resetaddboookin():ITAddBooking {
    return {
      StartTime: "",
      EndTime:"",
      TotalPrice:0,
      status:TStatus.Pending,
      TrainerId:"",
      Day:""
    }
  }
  //  ampm(time:string):string {
  //   if (time !== "") {
  //     //let hours:number = parseInt(time.split(":")[0]);
  //     // var minutes = time.split(":")[1];
  //     // var suffix = hours >= 12 ? "PM" : "AM";
  //     // hours = hours % 12 || 12;
  //     // let hour:string = hours < 10 ? "0" + hours.toString() : hours.toString();
  //     let displayTime:string = time + ":" + "00";
  //     return displayTime;
  //   }
  //   else{
  //     return "";
  //   }
  // }

}


// export class SeeTrainerScheduleComponent implements OnInit {
//   trainersSchedule: Array<ICustomerSeeScheduleT> = []
//   indexForTrainer:number = 0;
//   indexForSurface:number = 0;
//   images: Array<string> = []
//   currentIndex: number = 0;
//   name:string = "";
//   cat:string = "";
//   lat: number = 0;
//   lng: number = 0;
//   main: string = "";
//   street: string = "";
//   city: string = "";
//   gov: string = "";
//   workingHours: Array<string> = [];
//   description: string = "";
//   placeType!: [{
//     type: string, workingHours: Array<string>, description: string, schedule: [{day: string,date: string,schedule: [{period: string,duration: string,status: string}]}]}]
//   schedulee!: [{day: string,date: string,schedule: [{period: string,duration: string,status: string}]
//   }];
//   constructor(private reservationServ: CsutomerSeeSchedule2Service,
//     private router :Router) { }
//   ngOnInit() {
//     this.reservationServ.getTrainers().subscribe((_trainers) => {
//       this.trainersSchedule = _trainers;
//       this.name = this.trainersSchedule[this.indexForTrainer].Name
//       this.cat = this.trainersSchedule[this.indexForTrainer].Cat
//       this.images = this.trainersSchedule[this.indexForTrainer].imgsURL
//       this.lat = this.trainersSchedule[this.indexForTrainer].lat;
//       this.lng = this.trainersSchedule[this.indexForTrainer].lng;
//       this.main = this.trainersSchedule[this.indexForTrainer].main
//       this.street = this.trainersSchedule[this.indexForTrainer].street
//       this.city = this.trainersSchedule[this.indexForTrainer].city
//       this.gov = this.trainersSchedule[this.indexForTrainer].gov
//       this.workingHours = this.trainersSchedule[this.indexForTrainer].Surface[this.indexForSurface].workingHours
//       this.description = this.trainersSchedule[this.indexForTrainer].Surface[this.indexForSurface].description
//       this.placeType = this.trainersSchedule[this.indexForTrainer].Surface
//       this.schedulee = this.trainersSchedule[this.indexForTrainer].Surface[this.indexForSurface].schedule
//       this.description = this.trainersSchedule[this.indexForTrainer].Surface[this.indexForSurface].description

//     });
//     const map1 = document.getElementById("map")!
//     const map = new google.maps.Map(map1, {
//       center: { lat: this.lat, lng: this.lng },
//       zoom: 5,
//     });
//     const marker = new google.maps.Marker({
//       position: { lat: this.lat, lng: this.lng },
//       map: map,
//       title: "Place Location",
//     });
//   }
//   changeSurface(index: number) {
//     this.indexForSurface = index;
//     this.ngOnInit();
//   }
//   prevSlide() {
//     this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
//   }
//   nextSlide() {
//     this.currentIndex = (this.currentIndex + 1) % this.images.length;
//   }
//   scrollToMap() {
//     const element = document.getElementById('map');
//     if (element) {
//       element.scrollIntoView();
//     }
//   }
//   NavigateToBooking(){
//     this.router.navigate(['Booking']);
//   }
// }
