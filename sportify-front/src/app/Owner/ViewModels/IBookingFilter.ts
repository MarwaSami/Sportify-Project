import { BookingStatus, TStatus } from "src/app/Customer/ViewModels/IManageBooking";

export interface IBookingFilter{
  PlaceName:string,
  Price:number,
  date:string,
  Status:BookingStatus
}

export interface ITrainerBookingFilter{

  Price:number,
  date:string,
  Status:TStatus
}
