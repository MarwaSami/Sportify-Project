import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class ContactFormService {
  localhost: string = "https://localhost:59528"
  constructor(private http: HttpClient) {}

  sendContactForm(contactForm:ContactFormService) {
    return this.http.post(this.localhost + '/ContactUs', contactForm)
  }
}

