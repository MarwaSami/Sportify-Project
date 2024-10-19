import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Content-Type:authotication
    // value `bearer {localstorage.getitem('token')}`
    req = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    });
    // console.log(req);
    return next.handle(req);
  }
}
// "Content-Type": 'application/json',
// "Content-Type":"multipart/form-data"
//application/json
