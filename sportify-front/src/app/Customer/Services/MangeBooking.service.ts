import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BookingStatus,TStatus, IManageBooking, IManageTBooking } from '../ViewModels/IManageBooking';
import { IFavourite } from '../ViewModels/IFavourite';
import { HttpClient } from '@angular/common/http';
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { IBookingData } from '../ViewModels/IBooking';
import { BehaviorSubject } from 'rxjs';
import { IAddBooking, ITAddBooking } from '../ViewModels/IAddBooking';
import { IReservations } from 'src/app/Owner/ViewModels/IReservations';
import { PaginationViewModel } from 'src/app/Shared/ViewModels/PaginationViewModel';
import { IBookingFilter } from 'src/app/Owner/ViewModels/IBookingFilter';

@Injectable({
  providedIn: 'root'
})
export class MangeBookingService {
  baseUrl: string = "https://localhost:59528/Booking";
  TbaseUrl: string = "https://localhost:59528/Trainer";
  private bookingdata:BehaviorSubject<IBookingData> = new BehaviorSubject<IBookingData>(this.setDefaultdata())

    constructor(private http:HttpClient) {

     }
 // For Booking Place
  setDefaultdata():IBookingData{
  return  {
    placeId:0,
    date: new Date(),
    period:0,
    currentCapacity:0,
    totalprice:0,
    placeimg:"",
    placename:"",
    duration:1,
    type:1
  }
}
  setBookingdata(data:IBookingData){
    this.bookingdata.next(data);
  }
  getBookingdata():IBookingData{
    return this.bookingdata.getValue()
  }
  // Add Booking For Place and trainer
  AddBooking(data:IAddBooking): Observable<APIResult<string>> {
    console.log(data);

    return this.http.post<APIResult<string>>(this.baseUrl+`/AddBooking`,data);
  }
  AddTBooking(data:ITAddBooking): Observable<APIResult<string>> {
    console.log(data);
    return this.http.post<APIResult<string>>(this.TbaseUrl+`/AddTBooking`,data);
  }
  // Get Booking For Customer
  GetBookingBasedonStatus(status:Array<BookingStatus>):Observable<APIResult<Array<IManageBooking>>>{
    return this.http.post<APIResult<Array<IManageBooking>>>(this.baseUrl+`/GetBookingBasedonStatus`,status)
  }
  GetTBookingBasedonStatus(status:Array<TStatus>):Observable<APIResult<Array<IManageTBooking>>>{
    return this.http.post<APIResult<Array<IManageTBooking>>>(this.TbaseUrl+`/GetCustomerTBooking`,status)
  }
  // for Customer Update Booking status only to cancel
  UpdateBookingStatus(id:number,status:BookingStatus):Observable<APIResult<string>>{
    return this.http.get<APIResult<string>>(this.baseUrl+`/UpdateBookingStatus?bookingId=${id}&bookingStatus=${status}`)
  }
  UpdateTBookingStatus(id:number,status:TStatus):Observable<APIResult<string>>{
    return this.http.get<APIResult<string>>(this.TbaseUrl+`/UpdateCustomerTBooking?BookingId=${id}&status=${status}`)
  }
  // Add Fav sport
  GetFav(){
    return this.http.get<Array<IFavourite>>("https://localhost:59528/PreferredSports/Get")
  }
  fav: Array<IFavourite> = []
  AddFav(CategoryID:number){
    return this.http.get<Array<IFavourite>>("https://localhost:59528/PreferredSports/Add/"+CategoryID)
  }
  RemoveFav(CategoryID:number){
    return this.http.get<Array<IFavourite>>("https://localhost:59528/PreferredSports/Remove/"+CategoryID)
  }
  // Get All Booking and Filter For OWner
  getAllBooking(PAgeSize:number,PageIndex:number):Observable<APIResult<PaginationViewModel<IReservations>>>{
    return this.http.get<APIResult<PaginationViewModel<IReservations>>>('https://localhost:59528/Booking/GetAllBooking'+`?PageSize=${PAgeSize}&PageIndex=${PageIndex}`)
  }
  getLatestthreeBooking():Observable<APIResult<Array<IReservations>>>{
    return this.http.get<APIResult<Array<IReservations>>>('https://localhost:59528/Booking/GetLatestThreeBooking')
  }

  FilterBy(filter:IBookingFilter):Observable<APIResult<PaginationViewModel<IReservations>>>{
    return this.http.post<APIResult<PaginationViewModel<IReservations>>>("https://localhost:59528/Booking/BookingFilterBY",filter)
  }
}


