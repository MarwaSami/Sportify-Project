import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerSeeSchedule } from '../../Services/CustomerSeeSchedule.service';
import { ICustomerSeeSchedule } from '../../ViewModels/ICustomerSeeSchedule';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomerPlaceDetail, IOwnerPlaceDetail } from '../../ViewModels/IPlaceDetail';
import { EditplaceService } from 'src/app/Owner/Services/editplace.service';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { PlaceSchedule, SchedulePerHour } from 'src/app/Shared/ViewModels/Ischedule';
import { ToastrService } from 'ngx-toastr';
import { MangeBookingService } from '../../Services/MangeBooking.service';
import { IBookingData } from '../../ViewModels/IBooking';
@Component({
  selector: 'app-customer_see_place_schedule',
  templateUrl: './customer_see_place_schedule.component.html',
  styleUrls: ['./customer_see_place_schedule.component.css']
})
export class Customer_see_place_scheduleComponent implements AfterViewInit {
  placeName: string = "";
  cateName: string = "";
  placeSchedula: Array<PlaceSchedule> = this.placeser.GetScheduleDetails()
  place: ICustomerPlaceDetail = this.placeser.getCustomerPlace();
  constructor(private editervice: EditplaceService,
    private route: Router, private rou: ActivatedRoute, private bookingser: MangeBookingService,
    private placeser: PlacesService, private cateser: CategoriesService,
    private toster: ToastrService) {
    this.rou.params.subscribe(
      (param) => {
        if (param["id"] != null) {
          this.placeser.CustomerShowPlaceDetails(parseInt(param["id"])).subscribe(
            {
              next: result => {
                if (result.isSuccceed) {
                  this.place = result.data

                }
              },
              error: err => {
                console.log(err);
              }
            }
          );
        }
      })
    this.rou.params.subscribe((param) => {
      if (param["id"] != null) {
        this.placeser.GetPlaceScheduleByID(parseInt(param["id"])).subscribe(
          result => {
            if (result.isSuccceed) {
              this.placeSchedula = result.data
              console.log(this.placeSchedula);
            }
          })

      }
    }
    )
  }
  ngAfterViewInit(): void {
    const map1 = document.getElementById("map")!
    const map = new google.maps.Map(map1, {
      center: { lat: this.place.lat, lng: this.place.lng },
      zoom: 5,
    });
    const marker = new google.maps.Marker({
      position: { lat: this.place.lat, lng: this.place.lng },
      map: map,
      title: "Place Location",
    });
  }
  Edit(Id: number) {
    this.editervice.Editplace(Id);
    setTimeout(
      () => {
        this.route.navigateByUrl("/Owner/addplace")
      }
    )
  }
  NavigateToBooking(schedule: SchedulePerHour, item: PlaceSchedule) {
    if (schedule.status == 0) {
      this.toster.warning("Sorry, this Time Is already Booked \n\n try another Time in the Schedule")
    }
    else {
      let data:IBookingData={
        placeId:this.place.id,
        date:item.date,
        period:schedule.period,
        currentCapacity:schedule.capacity,
        totalprice:this.place.price,
        placeimg:this.place.attachments[0],
        placename:this.place.name,
        duration:item.schedule.length,
        type:this.place.type }
      this.bookingser.setBookingdata(data);
      this.route.navigateByUrl('/Customer/Booking');
    }
  }


}

// export class Customer_see_place_scheduleComponent implements OnInit {
//   placeschedule: Array<ICustomerSeeSchedule> = []
//   images: Array<string> = []
//   currentIndex: number = 0;
//   indexForPlace: number = 0;
//   indexForCat: number = 0;
//   lat: number = 0;
//   lng: number = 0;
//   main: string = "";
//   street: string = "";
//   city: string = "";
//   gov: string = "";
//   facilities: Array<string> = [];
//   workingHours: Array<string> = [];
//   description: string = "";
//   placeType!: [{
//     type: string, imgsURL: Array<string>, workingHours: Array<string>, description: string, facilities: Array<string>, schedule: [{day: string,date: string,schedule: [{period: string,duration: string,status: string}]}]}]
//   schedulee!: [{day: string,date: string,schedule: [{period: string,duration: string,status: string}]
//   }];
//   constructor(private reservationServ: CustomerSeeSchedule,
//     private router :Router) { }
//   ngOnInit() {
//     this.reservationServ.getPlace().subscribe((_place) => {
//       this.placeschedule = _place;
//       this.images = this.placeschedule[this.indexForPlace].placeType[this.indexForCat].imgsURL
//       this.lat = this.placeschedule[this.indexForPlace].lat;
//       this.lng = this.placeschedule[this.indexForPlace].lng;
//       this.main = this.placeschedule[this.indexForPlace].main
//       this.street = this.placeschedule[this.indexForPlace].street
//       this.city = this.placeschedule[this.indexForPlace].city
//       this.gov = this.placeschedule[this.indexForPlace].gov
//       this.facilities = this.placeschedule[this.indexForPlace].placeType[this.indexForCat].facilities
//       this.workingHours = this.placeschedule[this.indexForPlace].placeType[this.indexForCat].workingHours
//       this.description = this.placeschedule[this.indexForPlace].placeType[this.indexForCat].description
//       this.placeType = this.placeschedule[this.indexForPlace].placeType
//       this.schedulee = this.placeschedule[this.indexForPlace].placeType[this.indexForCat].schedule

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
//   changePlace(index: number) {
//     this.indexForPlace = index
//     this.ngOnInit();
//   }
//   changePlaceCat(index: number) {
//     this.indexForCat = index;
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
// let temp =[
//   {day: "sun",date: "6/11/1023",
//   schedule: [
//     {period: 9,duration: 1,status: "avalible", capacity:25},
//     {period: 10,duration: 1,status: "completed", capacity:0},
//     {period: 11,duration: 1,status: "partial avalible", capacity:10},
//     {period: 12,duration: 1,status: "avalible", capacity:25},
//     {period: 13,duration: 1,status: "avalible", capacity:25},
//     {period: 14,duration: 1,status: "avalible", capacity:25},
//   ]
// }
