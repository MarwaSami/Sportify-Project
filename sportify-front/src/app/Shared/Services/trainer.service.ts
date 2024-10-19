import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { ITrainerDetail, ITrainerFilter } from 'src/app/Customer/ViewModels/ITrainer-Filter';
import { APIResult } from '../ViewModels/APIResult';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  baseUrl: string = "https://localhost:59528";
  constructor(private ReviewsService: ReviewsService, private Http: HttpClient) { }

  // OwnerGetTrainerByID(id: number): Observable<APIResult<ITrainerDetail>> {
  //   return this.Http.get<APIResult<ITrainerDetail>>(this.baseUrl + `/OwnerShowTrainerDetails?id=${id}`);
  // }
  CustomerShowTrainerDetails(id: string): Observable<ITrainerDetail> {
    return this.Http.get<ITrainerDetail>(this.baseUrl + `/TrainerCard/Getone/${id}`);
  }

  // For details

  // getOwnerTrainerByID(id: string): ITrainerFilter {
  //   //   let trainers = this.getAll;
  //   let trainer: ITrainerFilter = {
  //     id: 0,
  //     name: "",
  //     description: "",
  //     facilities: [],
  //     image: "string",
  //   };
  //   return trainer
  // }
  getownerTrainer(): ITrainerDetail {
    let trainer: ITrainerDetail = {
      id: "string",
      userName: "string",
      categoryName: "string",
      adress: "string",
      image:"string",
      surface:"string",
      pricePerSession:0,
      workingHours:[],
      description :"string",
      jobTitle :"string"
    }
    return trainer;
  }
}