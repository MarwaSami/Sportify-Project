import { Time } from "@angular/common";
import { BookingStatus, TStatus } from "./IManageBooking";

export interface IAddBooking {
  StartTime: number,
  EndTime: number,
  TotalPrice: number,
  Code: number,
  Count: number,
  PlaceID: number,
  TypeID:number,
  Status: BookingStatus,
  Date:Date
}
export interface IUpdateStatus {
  ID: number,
  Status: BookingStatus,
}

export interface IAddTrainerBooking {
  StartTime: number,
  EndTime: number,
  TotalPrice: number,
  Count: number,
  Status: TStatus,
  Date:Date
}
export interface ITAddBooking {
  StartTime: string,
  EndTime: string,
  TotalPrice: number,
  TrainerId:string,
  status: TStatus,
  Day:string
}

