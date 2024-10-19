import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReview } from '../../Customer/ViewModels/IReview';
import { Injectable } from '@angular/core';
import { IOwnerReview } from '../ViewModels/IOwnerReview';
import { APIResult } from '../ViewModels/APIResult';
import { ITrainerReviews } from 'src/app/Customer/ViewModels/ITrainer-Filter';
import { IOwnerPlaces, IPlaceReviews } from 'src/app/Owner/ViewModels/Reviews';
import { IHomePlaceReview } from '../ViewModels/IHomePlaceReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  OwnerbaseUrl:string;
  TrainebaseUrl:string;
  TrainerbaseUrl:string;
  constructor(private http:HttpClient) {
    this.OwnerbaseUrl='https://localhost:59528/OwnerReview';
    this.TrainebaseUrl = 'https://localhost:59528/TrainerReview';
    this.TrainerbaseUrl='https://localhost:59528/Trainer';
  }

  get getAll(): Array<IOwnerReview> {
    return [];
  }
  addPReview(review: IReview): Observable<APIResult<string>> {
    return this.http.post<APIResult<string>>(this.OwnerbaseUrl + `/AddReview`, review);
  }
   addTReview(review:IReview):Observable<APIResult<string>>{
    return this.http.post<APIResult<string>>(this.TrainerbaseUrl+`/AddReview`,review);
   }
   updateTReview(review:IReview):Observable<APIResult<string>>{
     return this.http.post<APIResult<string>>(this.TrainerbaseUrl+`/UpdateReview`,review);
    }
  updatePReview(review: IReview): Observable<APIResult<string>> {
    return this.http.post<APIResult<string>>(this.OwnerbaseUrl + `/UpdateReview`, review);
  }
  GetReviewForTrainer(){
    return this.http.get<APIResult<ITrainerReviews[]>>(this.TrainebaseUrl+"/GetReviewForTrainer")
  }
  GetFirstThreeReview():Observable<APIResult<Array<IHomePlaceReview>>>{
    return this.http.get<APIResult<Array<IHomePlaceReview>>>(this.OwnerbaseUrl+'/GetFirstThreeReview')
  }
  GetReviewForTOwner(placeId:number){
    return this.http.get<APIResult<IPlaceReviews[]>>(this.OwnerbaseUrl+"/GetReviewForTOwner?placeId="+placeId)
  }
  GetOwnerPlacesForReviews(){
   return this.http.get<APIResult<IOwnerPlaces[]>>("https://localhost:59528/Place/GetOwnerPlacesForReviews")
  }



  // get getAll(): Array<IReview>{
  //   return [
  //     {id :1,user_id:1,place_id:2,rate_value:4,rate_msg:'Very good place'},
  //     {id :2,user_id:4,place_id:2,rate_value:2,rate_msg:' good place'},
  //     {id :3,user_id:2,place_id:3,rate_value:5,rate_msg:'excellent place'},
  //     {id :4,user_id:3,place_id:4,rate_value:1,rate_msg:'this is beautiful place'},
  //     {id :5,user_id:1,place_id:5,rate_value:4,rate_msg:'place is wonderful'}
  //   ]
  // }
  // getreviewbyplace_id(_id:number):Array<IReview>{
  // let allreviews:Array<IReview>=this.getAll
  // let selectedreview:Array<IReview>=[];
  // allreviews.forEach(elem=>{
  //  if(elem.place_id==_id)
  //  selectedreview.push(elem)
  // })
  // return selectedreview
  // }
  // getreviewbyid(_id:number):Array<IReview>{
  //   let allreviews:Array<IReview>=this.getAll
  //   let selectedreview:Array<IReview>=[];
  //   allreviews.forEach(elem=>{
  //    if(elem.id==_id)
  //    selectedreview.push(elem)
  //   })
  //   return selectedreview
  //   }
  //   getplacesbyid(_id:number):Set<number>{
  //     let allreviews:Array<IReview>=this.getAll
  //     let selectedreview:Set<number>=new Set();
  //     if(_id!=0)
  //     {
  //       allreviews.forEach(elem=>{
  //         selectedreview.add(elem.place_id)
  //        })
  //     }
  //     else
  //     {
  //       allreviews.forEach(elem=>{
  //         if(elem.id==_id)
  //         selectedreview.add(elem.place_id)
  //        })
  //     }
  //     return selectedreview
  //  }
}
