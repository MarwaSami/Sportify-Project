import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { Pagination } from 'src/app/Owner/Components/TRAINER/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL: string = 'https://localhost:59528/';
  constructor(private Http: HttpClient) { }

  getAllCustomers(pageSize: number, pageIndex: number): Observable<Pagination<User>> {
    return this.Http.get<Pagination<User>>(this.baseURL + 'Admin/GetCustomers?pageSize=' + pageSize + '&pageIndex=' + pageIndex);
  }

  getAllTrainers(pageSize: number, pageIndex: number): Observable<APIResult<Array<any>>> {
    return this.Http.get<APIResult<Array<any>>>(this.baseURL + 'Admin/GetTrainers?pageSize=' + pageSize + '&pageIndex=' + pageIndex);
  }

  getAllOwners(pageSize: number, pageIndex: number): Observable<APIResult<Array<any>>> {
    return this.Http.get<APIResult<Array<any>>>(this.baseURL + 'Admin/GetOwners?pageSize=' + pageSize + '&pageIndex=' + pageIndex);
  }

  getAllPlaces(pageSize: number, pageIndex: number): Observable<APIResult<Array<any>>> {
    return this.Http.get<APIResult<Array<any>>>(this.baseURL + 'Place/GetPlaces?pageSize=' + pageSize + '&pageIndex=' + pageIndex);
  }
}

export interface User {
  id: string
  location: string
  name: string
  nationalID: string
  phoneNumber: string
  profileImg: string
}
