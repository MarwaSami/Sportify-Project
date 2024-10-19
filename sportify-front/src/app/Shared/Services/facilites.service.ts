import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { IFacilities } from '../ViewModels/IFacilities';
import { APIResult } from '../ViewModels/APIResult';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacilitesService {

  constructor(private Http:HttpClient) {
  }
  get  getAll():Observable<APIResult<Array<IFacilities>>>{
    return this.Http.get<APIResult<Array<IFacilities>>>('https://localhost:59528/Facility');
  }
   getFacilitybyid(_id:number):IFacilities{
    let FacAll:[]
    let element!:IFacilities;
    return element
  }

}
