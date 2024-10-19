import { Observable, scheduled } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { ITschedule, getITschedule } from 'src/app/Shared/ViewModels/Ischedule';
@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  baseURL: string = "https://localhost:59528/Trainer/";
  constructor(private Http: HttpClient) {
    //this.addpformdata= new FormData();
  }
  getSchedule(): Observable<APIResult<getITschedule>> {
    return this.Http.get<APIResult<getITschedule>>(this.baseURL+"GetSchedule");
  }
  addSchedule(Schedule: FormData): Observable<APIResult<string>> {
    return this.Http.post<APIResult<string>>(this.baseURL + "SetSchedule",Schedule);
  }
  updateSchedule(Schedule: FormData): Observable<APIResult<string>> {
    return this.Http.post<APIResult<string>>(this.baseURL + "UpdateSchedule", Schedule);
  }
}
