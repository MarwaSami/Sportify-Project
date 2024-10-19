import { Ischedule } from './Ischedule';

export interface Iplace{
  id:number
  name:string
  description:string
  capacity:number
  pricePerhour:number
  facilities_ids:Array<number>
  lang:number
  lat:number
  city:string
  street:string
  categoryID:number
  ownerID:string
  typeID:number
  surfaceID:number
  attachments:Array<string>
  schedulesDay:Array<string>
  schedulesStartTime:Array<string>
  schedulesEndTime:Array<string>
}

