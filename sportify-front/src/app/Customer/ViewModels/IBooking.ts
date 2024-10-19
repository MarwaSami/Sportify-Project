export  interface IBookingData{
  placeId:number,
  date:Date,
  placeimg:string,
  placename:string,
  period:number,
  totalprice:number,
  currentCapacity:number,
  duration:number,
  type:number
}

export  interface ITrainerBookingData{
  trainerId:number,
  date:Date,
  trainerimg:string,
  trainername:string,
  period:number,
  totalprice:number,
  currentCapacity:number,
  duration:number,

}
