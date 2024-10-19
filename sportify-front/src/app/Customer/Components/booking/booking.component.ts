import { Toast, ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { MangeBookingService } from '../../Services/MangeBooking.service';
import { IBookingData } from '../../ViewModels/IBooking';
import { Router } from '@angular/router';
import { BookingStatus } from '../../ViewModels/IManageBooking';
import { IAddBooking } from '../../ViewModels/IAddBooking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  data: IBookingData = this.bookser.setDefaultdata();
  isconfirm: boolean = false;
  duration: number = this.data.duration;
  intitalprice: number = this.data.totalprice;
  discountprice: number;
  addBooking: IAddBooking;
  constructor(private bookser: MangeBookingService, private Toast: ToastrService,
    private route: Router) {
    this.data = this.bookser.getBookingdata();
    this.intitalprice = this.data.totalprice;
    this.addBooking = {
      StartTime: this.data.period,
      EndTime: this.data.period + this.duration,
      TotalPrice: this.intitalprice,
      Code: 0,
      Count: 1,
      PlaceID: this.data.placeId,
      Status: BookingStatus.Pending,
      TypeID: 1,
      Date:this.data.date,
    }
    this.discountprice = this.addBooking.TotalPrice * .05;
    console.log(this.data);

  }
  goToStep(stepNumber: number): void {
    const stepElements = document.getElementsByClassName('step');
    const currentStep = stepElements[stepNumber - 1] as HTMLElement;

    currentStep.classList.toggle('step--completed');

    const statusIcon = currentStep.getElementsByClassName('step__title--status-icon')[0] as HTMLElement;
    statusIcon.classList.toggle('step__title--status-icon-completed');
  }
  enablecheckhout() {
    this.Toast.warning("Check out to confirm booking", "Warning");
    this.isconfirm = true;
    console.log(this.data);

  }
  addbook() {
    console.log(this.data);
    
    this.addBooking.Status = BookingStatus.Pending;
    // console.log(this.addBooking);


    this.bookser.AddBooking(this.addBooking).subscribe(
      res => {
        if (res.isSuccceed) {
          this.Toast.success("You successfully booked");
          this.route.navigateByUrl(`/Customer/Profile/Booking/UpcomingBooking`)
        }
        else {
          this.Toast.warning(res.message)
        }
      }
    )
  }
  cancelbook() {
    this.route.navigateByUrl(`/Customer/see-schedule/${this.data.placeId}`)
  }
  addtotalprice(duration: HTMLInputElement, number: HTMLInputElement) {
    let dur = parseInt(duration.value)
    this.addBooking.EndTime = this.addBooking.StartTime + dur;
    let c = parseInt(number.value);
    this.addBooking.Count = c;
    this.data.totalprice = this.intitalprice * dur * c;

    console.log(this.intitalprice);
    this.addBooking.TotalPrice = this.data.totalprice
  }
  addcode(code: HTMLInputElement) {
    if (code.value == "510") {
      this.addBooking.Code = 510;
      this.addBooking.TotalPrice = this.addBooking.TotalPrice * .95;
      this.data.totalprice = this.addBooking.TotalPrice;
    }
    else {
      this.Toast.warning("Wrong code")
    }
  }
  addtype(data: any,number:any) {
    if (data.target.checked) {
      this.addBooking.TypeID = parseInt(data.target.id);
      if(this.data.type==3 && this.addBooking.TypeID==2){
        this.Toast.warning("This type is private means you will reserved the whole place ");
        this.addBooking.Count=this.data.currentCapacity;
        this.data.totalprice=this.data.currentCapacity*this.intitalprice*this.addBooking.Count;
        this.addBooking.TotalPrice=this.data.totalprice;
        number.target.value=this.data.currentCapacity;
      }
    }
    else {
      this.addBooking.TypeID = 1;
    }
  }
}
