export class Pagination<T>{
    data: T[] = []
    pageSize: number = 20;
    pageIndex: number = 1;
    count: number = 20;
}
