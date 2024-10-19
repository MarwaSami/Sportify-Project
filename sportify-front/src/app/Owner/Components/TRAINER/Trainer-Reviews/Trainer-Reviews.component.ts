import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITrainerReviews } from 'src/app/Customer/ViewModels/ITrainer-Filter';
import { ReviewsService } from 'src/app/Shared/Services/reviews.service';


@Component({
  selector: 'app-Trainer-Reviews',
  templateUrl: './Trainer-Reviews.component.html',
  styleUrls: ['./Trainer-Reviews.component.css']
})
export class TrainerReviewsComponent implements OnInit {
  TotalCount: number = 0;
  TotalRate: number = 0;
  reviews: ITrainerReviews[];

  constructor(private http: HttpClient, private reviewsService: ReviewsService) {
    this.reviews = [];
  }

  ngOnInit(): void {
    this.getReviews();
  }
 
  getReviews(): void {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    
    this.reviewsService.GetReviewForTrainer()
      .subscribe({
        next:(response) => {
        if(response.isSuccceed)
          this.reviews = response.data;

          let count= 0
          this.reviews.forEach(element => {
            count += element.rateValue
          });
          this.TotalCount = this.reviews.length;
          this.TotalRate = Math.round(count/this.reviews.length)
      }});
  }

}
