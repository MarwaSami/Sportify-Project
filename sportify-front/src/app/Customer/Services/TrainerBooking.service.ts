import { Injectable } from '@angular/core';
import { ITrainerBookingData } from '../ViewModels/IBooking';
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { IAddTrainerBooking } from '../ViewModels/IAddBooking';
import { ITrainerReservations } from 'src/app/Owner/ViewModels/IReservations';
import { PaginationViewModel } from 'src/app/Shared/ViewModels/PaginationViewModel';
import { ITrainerBookingFilter } from 'src/app/Owner/ViewModels/IBookingFilter';
import { IFavourite } from '../ViewModels/IFavourite';
import { BookingStatus, IManageTBooking, TStatus } from '../ViewModels/IManageBooking';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrainerBookingService {
  baseUrl: string = "https://localhost:59528/Booking";
  TbaseUrl: string = "https://localhost:59528/Trainer";
  private bookingdata: BehaviorSubject<ITrainerBookingData> = new BehaviorSubject<ITrainerBookingData>(this.setDefaultdata())
  setDefaultdata(): ITrainerBookingData {
    return {
      trainerId: 0,
      date: new Date(),
      period: 0,
      currentCapacity: 0,
      totalprice: 0,
      trainerimg: "",
      trainername: "",
      duration: 1,
    }
  }
  setBookingdata(data: ITrainerBookingData) {
    this.bookingdata.next(data);
  }
  getBookingdata(): ITrainerBookingData {
    return this.bookingdata.getValue()
  }
  UpdateBookingStatus(id: number, status: BookingStatus): Observable<APIResult<string>> {
    return this.http.get<APIResult<string>>(this.baseUrl + `/UpdateBookingStatus?bookingId=${id}&bookingStatus=${status}`)
  }
  UpdateTStatus(id: number, status: TStatus): Observable<APIResult<string>> {
    return this.http.get<APIResult<string>>(this.TbaseUrl + `/UpdateTBooking?BookingID=${id}&status=${status}`)
  }
  fav: Array<IFavourite> = []

  constructor(private http: HttpClient) {

  }
  AddBooking(data: IAddTrainerBooking): Observable<APIResult<string>> {
    console.log(data);

    return this.http.post<APIResult<string>>(this.baseUrl + `/AddBooking`, data);
  }
  getAllBooking(): Observable<APIResult<PaginationViewModel<ITrainerReservations>>> {
    return this.http.get<APIResult<PaginationViewModel<ITrainerReservations>>>('https://localhost:59528/Trainer/GetTrainerBookingList')
  }
  GetTrainerLatestBooking(): Observable<APIResult<Array<ITrainerReservations>>> {
    return this.http.get<APIResult<Array<ITrainerReservations>>>('https://localhost:59528/Trainer/GetTrainerLatestBooking')
  }
  GetBookingBasedonStatus(status: Array<TStatus>): Observable<APIResult<Array<IManageTBooking>>> {
    return this.http.post<APIResult<Array<IManageTBooking>>>(`https://localhost:59528/Trainer/GetBookingBasedonStatus`, status)
  }
  GetFav() {
    return this.http.get<Array<IFavourite>>("https://localhost:59528/PreferredSports/Get")
  }
  AddFav(CategoryID: number) {
    return this.http.get<Array<IFavourite>>("https://localhost:59528/PreferredSports/Add/" + CategoryID)
  }
  RemoveFav(CategoryID: number) {
    return this.http.get<Array<IFavourite>>("https://localhost:59528/PreferredSports/Remove/" + CategoryID)
  }
  FilterBy(filter: ITrainerBookingFilter): Observable<APIResult<PaginationViewModel<ITrainerReservations>>> {
    return this.http.post<APIResult<PaginationViewModel<ITrainerReservations>>>("https://localhost:59528/Trainer/BookingFilterBY", filter)
  }

}
