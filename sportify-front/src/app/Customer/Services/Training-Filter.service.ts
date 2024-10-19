import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { UpdateProfileViewModel } from '../ViewModels/ITrainer-Filter';


@Injectable({
  providedIn: 'root'
})
export class TrainingFilterService {
  localhost: string = "https://localhost:59528"
  constructor(private http: HttpClient) { }
  // getAllTrainers(): Observable<Array<any>> {
  //   return this.http.get<any[]>(this.localhost + '/TrainerCard')
  // }
  getAll() {
    console.log("service");

    return this.http.get(this.localhost + '/TrainerCard/GetAll')
  }
  get() {
    return this.http.get<UpdateProfileViewModel>(this.localhost + `/GetTrainerProfile`);
  }

  update(data: any){
    return this.http.put(this.localhost+"/UpdateTrainerProfile",data)
  }
}
