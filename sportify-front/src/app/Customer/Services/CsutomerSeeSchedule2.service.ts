import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CsutomerSeeSchedule2Service {
  apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  getTrainers(): Observable<Array<any>> {
    return this.http.get<any[]>(this.apiUrl)
  }
}
