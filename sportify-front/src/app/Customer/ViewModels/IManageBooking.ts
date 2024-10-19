
export interface IManageBooking {
    placeName:string,
    reservitionId:number,
    totalPrice:number,
    count:number
    reservitionDate:string,
    reservitionTime:string,
    reservitionEndTime:string,
    reservitionStatus:BookingStatus,
    isReviewed:boolean,
    ReviewID:number
}

export interface IManageTBooking {
  trainerName:string,
  reservitionId:number,
  totalPrice:number,
  reservitionDate:string,
  reservitionTime:string,
  reservitionEndTime:string,
  reservitionStatus:TStatus,
  isReviewed:boolean,
  ReviewID:number,
  phoneNumber:string
}



export enum BookingStatus{
  Pending,
  Confirmed,
  Completed,
  Rejected
  }
  export enum TStatus
  {
      Pending,
      Rejected,
      Confirmed,
      Completed
  }
