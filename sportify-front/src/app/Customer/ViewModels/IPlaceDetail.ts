import { Ischedule } from "src/app/Shared/ViewModels/Ischedule"

export interface IPlaceDetail{
  id:number
  name:string
  description:string
  facilities:Array<string>
  category:string
  address:string
  Schedules:Array<Ischedule>
  attachments:Array<string>
}
export interface IOwnerPlaceDetail{
  id:number
  name:string
  description:string
  facilities:Array<string>
  category:string
  address:string
  bookings:Array<Ibooking>
  attachments:Array<string>
}
export interface Ibooking {
  id:number,
  name: string,
  orderDate:string,
  totalPrice:number,
  status:number,
  startTime: string,
  endTime: string
}
export interface ICustomerPlaceDetail{
  id:number
  name:string
  ownerName:string
  description:string
  price:number
  type:number
  facilities:Array<string>
  category:string
  address:string
  bookings:Array<Ischedule>
  attachments:Array<string>
  workingHours:Array<Ischedule>
  lng:number
  lat:number
}
