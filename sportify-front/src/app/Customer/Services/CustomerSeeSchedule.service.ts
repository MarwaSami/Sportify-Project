import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomerSeeSchedule {
  apiUrl = 'http://localhost:5500'
  constructor(private http: HttpClient) { }
  getPlace(): Observable<Array<any>> {
    return this.http.get<any[]>(this.apiUrl)
  }
}
