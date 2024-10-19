export class PaginationViewModel<T>{
  data:Array<T>=[];
  pageSize:number=6;
  pageIndex:number=1;
  count:number=0;
}
