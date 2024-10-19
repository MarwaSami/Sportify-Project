import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';

@Injectable({
  providedIn: 'root'
})
export class EditplaceService {
  private PlaceId:BehaviorSubject<number>
  private IsAttachchanged:BehaviorSubject<boolean>;
  private Place:BehaviorSubject<Iplace>;
  constructor(private Placeser:PlacesService) {
   this.PlaceId= new BehaviorSubject<number>(-1);
   this.Place=new BehaviorSubject<Iplace>(
   {
  id:0,name:"",description:"",
  capacity:0, pricePerhour:0,
  facilities_ids:[],lang:0,
  lat:0, city:"",
  street:"",categoryID:0,
  ownerID:"",typeID:0,
  surfaceID:0,
  attachments:[],
  schedulesDay:[],
  schedulesStartTime:[],
  schedulesEndTime:[]
  });
   this.IsAttachchanged=new BehaviorSubject<boolean>(false);
   }
   Editplace(id:number){
   this.PlaceId.next(id);
   }

   ChangeAttachment(id:number){
    this.IsAttachchanged.next(true);
    }
   GetPlaceId(){
    return this.PlaceId;
   }
   SetPlace(Place:Iplace){
    this.Place.next(Place);
   }
   GetPlace():BehaviorSubject<Iplace>{
   return this.Place
   }
   GETAttachmentchange(){
    return this.IsAttachchanged;
   }
}
