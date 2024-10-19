import { Component, OnInit } from '@angular/core';
import { IReservations } from '../../ViewModels/IReservations';
import { SeeReservationsService } from '../../Services/see-reservations.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BookingStatus } from 'src/app/Customer/ViewModels/IManageBooking';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { IAddBooking } from 'src/app/Customer/ViewModels/IAddBooking';
import { IBookingFilter } from '../../ViewModels/IBookingFilter';


@Component({
  selector: 'app-owner-seereservations',
  templateUrl: './owner-seereservations.component.html',
  styleUrls: ['./owner-seereservations.component.css']
})
export class OwnerSeereservationsComponent implements OnInit {
  showAddForm: boolean = false;
  count: number = 0;
  reservationForm: FormGroup;
  boolea: boolean = true;
  filterCondition?: boolean;
  filteredReservations: Array<IReservations> = [];
  reservations: Array<IReservations> = [];
  userFilter: IBookingFilter = this.resetUserFilter();
  // Remain owner addBooking
  addreservation!: IAddBooking;
  PageSize: number = 8;
  isfilter = false;
  PageIndex: number = 1;
  places: Array<string> = [];
  constructor(
    private reservationServ: MangeBookingService,
    private fb: FormBuilder
  ) {
    this.userFilter = this.resetUserFilter();
    this.reservationForm = this.fb.group({
      Place: ['', Validators.required],
      ReservationDate: ['', Validators.required],
      Price: ['', Validators.required],
      StartTime: ['', Validators.required],
    });
   if(!this.isfilter){
    this.getReservation();
   }
  }
  ngOnInit() {

  }
  filterReservations(place: any, date: any, price: any) {
    this.isfilter = true
    let status = document.getElementsByClassName("form-check-input");
    for (var index = 0; index < 3; index++) {
      let check = status[index] as HTMLInputElement;
      // console.log(check);
      if (check.checked) {
        this.userFilter.Status = parseInt(check.id);
      }
     // console.log(place);
      this.userFilter.PlaceName = place.value;
      this.userFilter.Price = parseInt(price.value);
      this.userFilter.date = date.value == "" ? new Date() : date.value;
     // console.log(this.userFilter);
       this.getreservationFilter();
    }

    // this.filteredReservations = this.reservations.filter((reservation) => {
    //   const fromDate = this.fromDateFilter ? new Date(this.fromDateFilter) : null;
    //   const toDate = this.toDateFilter ? new Date(this.toDateFilter) : null;
    //   const reservationDate = new Date(reservation.reservationDate);
    //   const dateInRange = (!fromDate || reservationDate >= fromDate) && (!toDate || reservationDate <= toDate);

    //   this.filterCondition =
    //     (reservation.user.toLowerCase().includes(this.userFilter.toLowerCase())) &&
    //     (!this.placeFilter || reservation.place.toLowerCase() == this.placeFilter.toLowerCase()) &&
    //     (!this.priceFilter || reservation.price <= parseInt(this.priceFilter)) &&
    //     (!this.statuesFilter || reservation.status === this.statuesFilter) &&
    //     dateInRange;
    //   this.boolea = false;
    //   return this.filterCondition;
    // });

  }
  resetFilter() {
    this.boolea = true;
    this.userFilter = this.resetUserFilter();
    this.getReservation();
  }
  confirmBooking(reservation: IReservations) {
    reservation.status = BookingStatus.Confirmed;
    console.log(reservation);
    this.updateStatus(reservation.id, reservation.status);
  }
  completeBooking(reservation: IReservations) {
    reservation.status = BookingStatus.Completed;
    this.updateStatus(reservation.id, reservation.status);
  }
  showAddReservationForm() {
    this.showAddForm = true;
  }
  addReservation() {
    // this.reservationServ.addNewReservation(JSON.stringify(this.reservationForm.value))
    this.showAddForm = false;
    this.reservationForm.reset();
    this.reservationForm = this.fb.group({
      user: ['', Validators.required],
      place: ['', Validators.required],
      reservationDate: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      price: ['', Validators.required],
      status: "pending"
    });
    this.ngOnInit();
  }
  updateStatus(id: number, status: BookingStatus) {
    this.reservationServ.UpdateBookingStatus(id, status).subscribe(
      result => {
        if (result.isSuccceed) {
          this.getReservation();
        }
      }
    )
  }
  getReservation() {
    this.reservationServ.getAllBooking(this.PageSize, this.PageIndex).subscribe(
      result => {
        if (result.isSuccceed) {
          this.reservations = result.data.data;
          // console.log(this.reservations);
          this.count = result.data.count;
        }
      }
    )
  }
  resetUserFilter(): IBookingFilter {
    // console.log(new Date().toJSON().split("T")[0]);
    return {
      PlaceName: "",
      Price: 0,
      date: new Date().toJSON().split("T")[0],
      Status: BookingStatus.Pending
    }
  }
  // for pagination
  changPage(data: any) {
    console.log(data);
    this.PageIndex = data;
    if ((this.userFilter.PlaceName != "" || this.userFilter.Price != 0) && this.isfilter)
      this.getreservationFilter();
    else {
      this.getReservation();
    }
  }
  getreservationFilter() {
    this.reservationServ.FilterBy(this.userFilter).subscribe(
      result => {
        if (result.isSuccceed) {
          this.reservations = result.data.data;
          console.log(this.reservations);

        }
      }
    )
  }
}
