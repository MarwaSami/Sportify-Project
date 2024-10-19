// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ITrainerReviews } from 'src/app/Customer/ViewModels/ITrainer-Filter';


// @Injectable({
//   providedIn: 'root'
// })
// export class ReviewsService {
//   localhost: string = "https://localhost:59528";
//   baseUrl: string = this.localhost + '/GetReviewForTrainer';

//   constructor(private http: HttpClient) { }

//   GetReviewForTrainer(): Observable<ITrainerReviews[]> {
//     const url = `${this.baseUrl}`;
//     return this.http.get<ITrainerReviews[]>(url);
//   }
//   getAllReviews(userId: string, trainerId: string): Observable<ITrainerReviews[]> {
//     const url = `${this.baseUrl}?userId=${userId}&trainerId=${trainerId}`;
//     return this.http.get<ITrainerReviews[]>(url);
//   }

//   deleteReview(id: number): Observable<void> {
//     const url = `${this.baseUrl}/${id}`;
//     return this.http.delete<void>(url);
//   }
// }
