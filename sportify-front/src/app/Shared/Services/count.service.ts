import { APIResult } from './../ViewModels/APIResult';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminCount } from '../ViewModels/IAdminCount';
import { ICount } from 'src/app/Owner/ViewModels/ICount';
@Injectable(
  {
    providedIn: "root"
  }
)
export class CountService {
  private baseUrl = "https://localhost:59528/";
  private adminbaseUrL = this.baseUrl + "Admin"
  private trainerbaseUrl = this.baseUrl + "Trainer"
  private ownerbaseUrl = this.baseUrl + "Booking"
  private placebaseUrl = this.baseUrl + "Place"
  constructor(private http: HttpClient) {

  }
  // For Admin
  GetALLCount(): Observable<IAdminCount> {
    return this.http.get<IAdminCount>(this.adminbaseUrL + "/GETALLCount");
  }
  resetIAdminCount():IAdminCount{
   return {
    customers:0,
    owners:0,
    trainers:0,
    places:0,
    placeBooking:0,
    placeTotalEarnings:0,
    trainerBooking:0,
    trainerTotalEarnings:0
   }
  }
  GetALLForOwnerCount(): Observable<ICount> {
    return this.http.get<ICount>(this.ownerbaseUrl + "/GetALLOwnerCount");
  }
  GetPlacesForOwnerCount(): Observable<APIResult<number>> {
    return this.http.get<APIResult<number>>(this.placebaseUrl + "/GetPlacesCount");
  }
  GetALLForTrainerCount(): Observable<ICount> {
    return this.http.get<ICount>(this.trainerbaseUrl + "/GetTrainerCount");
  }

}
