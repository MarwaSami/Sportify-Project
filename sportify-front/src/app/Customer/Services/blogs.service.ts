import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IBlogs } from '../ViewModels/IBlog';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiURL = 'https://localhost:59528/blog';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<IBlogs[]> {
    return this.http.get<IBlogs[]>(this.apiURL)
  }

  getBlog(id: number): Observable<APIResult<IBlogs>> {
    const url = `${this.apiURL}/GetDetails/${id}`;
    return this.http.get<APIResult<IBlogs>>(url) 
  }

  createBlog(blog: IBlogs): Observable<IBlogs> {
    return this.http.post<IBlogs>(this.apiURL, blog)
  }

  // updateBlog(id: string, blog: IBlogs): Observable<IBlogs> {
  //   const url = `${this.apiURL}/${id}`;
  //   return this.http.put<IBlogs>(url, blog)
  // }

  // deleteBlog(id: string): Observable<IBlogs> {
  //   const url = `${this.apiURL}/${id}`;
  //   return this.http.delete<IBlogs>(url)
  // }

}