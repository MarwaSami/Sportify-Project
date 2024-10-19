import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iplace } from './../ViewModels/IPlace';
import { ReviewsService } from './reviews.service';
import { FacilitesService } from './facilites.service';
import { Icategory } from './../ViewModels/Icategory';
import { Injectable } from '@angular/core';
import { IFilterPlace } from 'src/app/Customer/ViewModels/IFilterPlace';
import { APIResult } from '../ViewModels/APIResult';
import { Observable } from 'rxjs';
import { IMYPlace } from 'src/app/Owner/ViewModels/IMyPlace';
import { IFilter } from 'src/app/Customer/ViewModels/IFilter';
import { ICustomerPlaceDetail, IOwnerPlaceDetail, IPlaceDetail } from 'src/app/Customer/ViewModels/IPlaceDetail';
import { ISearchPlace } from 'src/app/Customer/ViewModels/ISearchPlace';
import { PaginationViewModel } from '../ViewModels/PaginationViewModel';
import { PlaceSchedule } from '../ViewModels/Ischedule';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  baseUrl: string = "https://localhost:59528/Place";
  placeScheduleUrl : string = "https://localhost:59528/Schedule/GetPlaceScedule"
  constructor(private FacilitesService: FacilitesService,
    private ReviewsService: ReviewsService, private Http: HttpClient) { }
  GetPlaceScheduleByID(id:number): Observable<APIResult<Array<PlaceSchedule>>> {
      return this.Http.get<APIResult<Array<PlaceSchedule>>>(this.placeScheduleUrl+`?id=${id}`);
    }
  // Get All PLaces For Filter View
  getAll(pageSize:number,pageIndex:number): Observable<APIResult<PaginationViewModel<IFilterPlace>>> {
    return this.Http.get<APIResult<PaginationViewModel<IFilterPlace>>>(this.baseUrl+`?pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }
  RemovePlace(id:number){
    return this.Http.get<APIResult<string>>(this.baseUrl+'/RemovePlace?id='+id);
  }
  OwnerGetPlaceByID(id: number): Observable<APIResult<IOwnerPlaceDetail>> {
    return this.Http.get<APIResult<IOwnerPlaceDetail>>(this.baseUrl + `/OwnerShowPlaceDetails?id=${id}`);
  }
  CustomerShowPlaceDetails(id: number): Observable<APIResult<ICustomerPlaceDetail>> {
    return this.Http.get<APIResult<ICustomerPlaceDetail>>(this.baseUrl + `/CustomerShowPlaceDetails?id=${id}`);
  }
  //For get all city this is avaible to filter
  getallplacescity(): Observable<APIResult<Set<string>>> {
    return this.Http.get<APIResult<Set<string>>>(`${this.baseUrl}/PlaceCities`)
  }
  // For See my places at owner Places view
  OwnerPlaces(pageSize:number,pageIndex:number): Observable<APIResult<PaginationViewModel<IMYPlace>>> {
    return this.Http.get<APIResult<PaginationViewModel<IMYPlace>>>(`${this.baseUrl}/GetOwnerPlaces?pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }
  // For details

  getOwnerplaceByID(id: number): IFilterPlace {
    //   let places = this.getAll;
    let place: IFilterPlace = {
      id: 0,
      name: "",
      description: "",
      facilities: [],
      attachments: [],
    };
    return place
  }
  getownerPlace(): IOwnerPlaceDetail {
    let details: IOwnerPlaceDetail = {
      id: 0,
      name: "string",
      description: "",
      facilities: [],
      category: "",
      address: "",
      bookings: [],
      attachments: []
    }
    return details;
  }
  getCustomerPlace(): ICustomerPlaceDetail {
    let details: ICustomerPlaceDetail = {
      id: 0,
      name: "string",
      description: "string",
      facilities: [],
      category: "string",
      address: "string",
      ownerName:"",
      bookings: [],
      attachments: [],
      workingHours:[],
      price:0,
      lng:0,
      lat:0,
      type:1
    }
    return details;
  }
  // For Edit Place At owner
  setdefaultPlace(): Iplace {
    let place: Iplace = {
      id: 0,
      name: "",
      description: "",
      capacity: 0,
      pricePerhour: 0,
      facilities_ids: [],
      lang: 0,
      lat: 0,
      city: "",
      street: "",
      categoryID: 0,
      ownerID: "",
      typeID: 0,
      surfaceID: 0,
      attachments: [],
      schedulesDay:[],
      schedulesStartTime:[],
      schedulesEndTime:[]}
      return place;
  }
  // For Edit Get Place ALL
  getAllplaceByID(id: number): Observable<APIResult<Iplace>> {
    return this.Http.get<APIResult<Iplace>>(`${this.baseUrl}/GetPlaceByID/${id}`);
  }
  // For Filter
  filterby(data: IFilter): Observable<APIResult<PaginationViewModel<IFilterPlace>>> {
    let Formdata: FormData = new FormData();
    let dataArr = Object.entries(data);
    dataArr.forEach(value => {
      console.log(value);
      Formdata.append(value[0], value[1]);
    })
    return this.Http.post<APIResult<PaginationViewModel<IFilterPlace>>>(`${this.baseUrl}/Filter`, data);
  }
  //For Search
  Search(data:ISearchPlace):Observable<APIResult<PaginationViewModel<IFilterPlace>>>{
    return this.Http.post<APIResult<PaginationViewModel<IFilterPlace>>>(`${this.baseUrl}/Search`,data);
  }
  GetScheduleDetails(): Array<PlaceSchedule> {
    let details: Array<PlaceSchedule> = [{
      dayofWeek: "string",
      date: new Date,
      isWorking: false,
      schedule: [{period:1,duration:1,status:2,capacity:30},{period:1,duration:1,status:1,capacity:30}],
    },{
      dayofWeek: "string",
      date: new Date,
      isWorking: false,
      schedule: [{period:5,duration:5,status:0,capacity:30},{period:1,duration:1,status:1,capacity:30}],
    }]
    return details;
  }
  GetCounterForPlace(id:number):Observable<APIResult<number>>{
    return this.Http.get<APIResult<number>>(this.baseUrl+`/GetCounterForPlace?CategoryID=${id}`);
  }
}

