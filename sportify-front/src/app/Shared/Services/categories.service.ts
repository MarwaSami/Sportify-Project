import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Icategory } from '../ViewModels/Icategory';
import { HttpClient } from '@angular/common/http';
import { APIResult } from '../ViewModels/APIResult';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private Http:HttpClient) { }



  get getAll():Observable<APIResult<Array<Icategory>>>{
    return this.Http.get<APIResult<Array<Icategory>>>('https://localhost:59528/Category/GetAll');
  }
  getById(_id:number):Icategory{
    //let catearr:Array<Icategory>=this.getAll
    let selectedcate:Icategory={id:0,name:'',pic:''}
    // catearr.forEach(
    //   (val,key)=>{
    //    if(val.id==_id)
    //    {
    //     selectedcate= val
    //    }
    //   }

    // )
    return selectedcate
  }
  get getAllname():Array<string>{
  let names:Array<string>=[];
  // let cates:Array<Icategory>=this.getAll;
  // for(let i=0;i<cates.length;i++)
  // {
  //  names[i]=cates[i].name;
  // }
  return names
  }

}
