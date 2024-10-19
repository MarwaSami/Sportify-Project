import { Component } from '@angular/core';
import { IOwnerPlaces, IPlaceReviews, Reviews } from '../../ViewModels/Reviews';
import { HttpClient } from '@angular/common/http';
import { ReviewsService } from 'src/app/Shared/Services/reviews.service';


@Component({
  selector: 'app-reviwes',
  templateUrl: './reviwes.component.html',
  styleUrls: ['./reviwes.component.css']
})
export class ReviwesComponent {
  TotalCount: number = 0;
  TotalRate: number = 0;
  reviews: IPlaceReviews[];
  places: IOwnerPlaces[] = [];
  placeId = 0;
  constructor(private http: HttpClient, private reviewsService: ReviewsService) {
    this.reviews = [];
  }

  ngOnInit(): void {
    this.TotalRate=0;
    this.getReviews();
    this.reviewsService.GetOwnerPlacesForReviews().subscribe({
      next: (data) => {
        this.places = data.data
        console.log('places data',this.places);
      }
    })
  }
  ChangePlace(id:any){
    this.placeId = id;
    this.getReviews()
  }
  getReviews(): void {
    console.log("Review");
  
    this.reviewsService.GetReviewForTOwner(this.placeId)
      .subscribe({
        next: (response) => {
          if (response.isSuccceed)
            this.reviews = response.data;
            console.log("with place",this.placeId)
            console.log(this.reviews);
            
          let count = 0
          this.reviews.forEach(element => {
            count += element.rateValue
          });
          this.TotalCount = this.reviews.length;
          this.TotalRate = Math.round(count / this.reviews.length)
          console.log(this.TotalRate);
          
        }
      });
  }





}



