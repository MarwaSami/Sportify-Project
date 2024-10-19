import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBlogs } from '../ViewModels/IBlog';
import { Category } from 'src/app/Owner/ViewModels/Category';
import { Observable } from 'rxjs'
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { Icategory } from 'src/app/Shared/ViewModels/Icategory';
import { IBlog } from '../ViewModels/IBlog';
import { PaginationViewModel } from 'src/app/Shared/ViewModels/PaginationViewModel';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://localhost:59528/Blog/Add';
  private apiUrl2 = 'https://localhost:59528/Category/GetAll'
  private apiUrl3 = 'https://localhost:59528/Blog/GetAll'
  private apiUrl4 = 'https://localhost:59528/Blog';

constructor(private http: HttpClient) { }
addBlog(blogData: FormData): Observable<APIResult<string>> {
  return this.http.post<APIResult<string>>(this.apiUrl, blogData);
}
GetCategories():Observable<APIResult<Array<Icategory>>>{
  return this.http.get<APIResult<Array<Icategory>>>(this.apiUrl2)
}
GetAllBlogs(pageSize:number,pageIndex:number):Observable<APIResult<PaginationViewModel<IBlog>>>{
  return this.http.get<APIResult<PaginationViewModel<IBlog>>>(this.apiUrl3+`?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}
GetLatestThree():Observable<APIResult<Array<IBlog>>>{
  return this.http.get<APIResult<Array<IBlog>>>(this.apiUrl4+`/GetLatestThree`)
}
}
