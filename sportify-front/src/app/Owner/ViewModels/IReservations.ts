import { BookingStatus, TStatus } from "src/app/Customer/ViewModels/IManageBooking"

export interface IReservations {
    id:number
    startTime:string,
    endTime:string,
    totalPrice:number,
    Type:string,
    count:number,
    userName:string,
    placeName:string,
    reservationDate:Date,
    status:BookingStatus,
    type:string
}

export interface ITrainerReservations {
    id:number
    startTime:string,
    endTime:string,
    price:number,
    userName:string,
    reservationDate:Date,
    status:TStatus,

}

