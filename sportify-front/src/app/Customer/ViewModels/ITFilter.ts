export interface ITFilter{
  OrderBy:string
  IsAscending:boolean
  CategoryID:Array<number>
  RateValue:Array<number>
  City:Array<string>
  SurfaceID:Array<number>
  pageSize:number,
  pageIndex:number
  }
