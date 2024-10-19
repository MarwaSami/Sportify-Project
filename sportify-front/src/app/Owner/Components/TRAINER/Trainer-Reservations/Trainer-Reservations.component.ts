import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainerBookingService } from 'src/app/Customer/Services/TrainerBooking.service';
import { IAddTrainerBooking } from 'src/app/Customer/ViewModels/IAddBooking';
import { TStatus } from 'src/app/Customer/ViewModels/IManageBooking';
import { ITrainerBookingFilter } from 'src/app/Owner/ViewModels/IBookingFilter';
import { ITrainerReservations } from 'src/app/Owner/ViewModels/IReservations';


@Component({
  selector: 'app-Trainer-Reservations',
  templateUrl: './Trainer-Reservations.component.html',
  styleUrls: ['./Trainer-Reservations.component.css']
})

export class TrainerReservationsComponent implements OnInit {
  showAddForm: boolean = false;
  count: number = 0;
  reservationForm: FormGroup;
  boolea: boolean = true;
  filterCondition?: boolean;
  role:string=""
  filteredReservations: Array<ITrainerReservations> = [];
  reservations: Array<ITrainerReservations> = [];
  userFilter: ITrainerBookingFilter = this.resetUserFilter();
  // Remain owner addBooking
  addreservation!: IAddTrainerBooking;
  constructor(
    private trainerBookingServ: TrainerBookingService,
    private fb: FormBuilder
  ) {
    this.getReservation();
    this.userFilter = this.resetUserFilter();
    this.reservationForm = this.fb.group({
      ReservationDate: ['', Validators.required],
      Price: ['', Validators.required],
      StartTime: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.trainerBookingServ.getAllBooking().subscribe((_reservation) => {
      this.reservations = _reservation.data.data;
      console.log(this.reservations);

    });
  }
  filterReservations( date: any, price: any) {
    let status = document.getElementsByClassName("form-check-input");
    for (var index = 0; index < 2; index++) {
      let check = status[index] as HTMLInputElement;
      if (check.checked) {
        this.userFilter.Status = parseInt(check.id);
        this .userFilter.Price=price
        this .userFilter.date=date
      }

      this.userFilter.Price = parseInt(price.value);
      this.userFilter.date = date.value == "" ? new Date() : date.value;
      console.log(this.userFilter);
      this.trainerBookingServ.FilterBy(this.userFilter).subscribe(
        result => {
          if (result.isSuccceed) {
            this.reservations = result.data.data;
          }
        }
      )
    }

  }
  resetFilter() {
    this.boolea = true;
    this.userFilter = this.resetUserFilter();
  }
  confirmBooking(reservation: ITrainerReservations) {
    reservation.status = TStatus.Confirmed;
    console.log(reservation.status);
    this.updateStatus(reservation.id, reservation.status);
  }
  completeBooking(reservation: ITrainerReservations) {
    reservation.status = TStatus.Completed;
    this.updateStatus(reservation.id, reservation.status);
  }
  rejectBooking(reservation: ITrainerReservations) {
    reservation.status = TStatus.Rejected;
    this.updateStatus(reservation.id, reservation.status);
  }
  showAddReservationForm() {
    this.showAddForm = true;
  }
  addReservation() {
    // this.trainerBookingServ.addNewReservation(JSON.stringify(this.reservationForm.value))
    this.showAddForm = false;
    this.reservationForm.reset();
    this.reservationForm = this.fb.group({
      user: ['', Validators.required],
      reservationDate: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      price: ['', Validators.required],
      status: "pending"
    });
    this.ngOnInit();
  }
  updateStatus(id: number, status: TStatus) {
    this.trainerBookingServ.UpdateTStatus(id, status).subscribe(
      result => {
        if (result.isSuccceed) {
          this.getReservation();
        }
      }
    )
  }
  getReservation() {

    this.trainerBookingServ.getAllBooking().subscribe(
      result => {
        if (result.isSuccceed) {
          this.reservations = result.data.data;
          this.count = result.data.count;
        }
      }
    )
  }
  resetUserFilter(): ITrainerBookingFilter {
    console.log(new Date().toJSON().split("T")[0]);

    return {
      Price: 0,
      date: new Date().toJSON().split("T")[0],
      Status: TStatus.Pending
    }
  }
}
