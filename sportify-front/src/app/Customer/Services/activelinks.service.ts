import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivelinksService {
  isOurserivce:BehaviorSubject<boolean>
  istestimonials:BehaviorSubject<boolean>
  constructor() {
    this.isOurserivce=new BehaviorSubject<boolean>(false)
    this.istestimonials=new BehaviorSubject<boolean>(false)
  }
}
