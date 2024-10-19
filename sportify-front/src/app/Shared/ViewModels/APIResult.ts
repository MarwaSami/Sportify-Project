export interface APIResult<T>{
  data :T,
  isSuccceed :boolean,
  message:string,
  status :number

}
