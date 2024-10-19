import { Reviews } from './../../../Owner/ViewModels/Reviews';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icategory } from 'src/app/Shared/ViewModels/Icategory';
import { ActivelinksService } from '../../Services/activelinks.service';
import { BlogService } from '../../Services/Blog.service';
import { IBlog } from '../../ViewModels/IBlog';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { count } from 'rxjs';
import { MangeBookingService } from '../../Services/MangeBooking.service';
import { ReviewsService } from 'src/app/Shared/Services/reviews.service';
import { IHomePlaceReview } from 'src/app/Shared/ViewModels/IHomePlaceReview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  FilterForm: FormGroup;
  blogs:IBlog[]=[];
  categories: Array<Icategory>=[]
  CategoryCounter:number[]=[];
  Reviews:Array<IHomePlaceReview>=[];
  constructor(private builder: FormBuilder, private cateservice: CategoriesService,private BlogsSer:BlogService
     ,private route: Router,private placeser:PlacesService,reviewser:ReviewsService
     , private linkser: ActivelinksService) {
    this.FilterForm = this.builder.group(
      {
        CategoryID: ['all', []],
        Location: ['', [Validators.required]]
      }
    )
    reviewser.GetFirstThreeReview().subscribe(
      (res)=>{
        if(res.isSuccceed){
          this.Reviews=res.data;
          console.log(this.Reviews);

        }
      }
    )
    //cateservice.getAll;
   cateservice.getAll.subscribe(
    result=>{if(result.isSuccceed){
      console.log(result.data);
      this.categories=result.data;
      this.getAllCounters();
    }}
   );
    this.linkser.isOurserivce.subscribe(
      (val) => {
        if (val) {
        setTimeout(() => {
          const element = document.getElementById('Services');
          if (element) {
            element.scrollIntoView();
          }
        }, 500);
        }
      }
    )
    this.linkser.istestimonials.subscribe(
      (val) => {
        if (val) {
        setTimeout(() => {
          const element = document.getElementById('testimonials');
          if (element) {
            element.scrollIntoView();
          }
        }, 500);
        }
      }
    )
    this.getAllBlogs();
  }

  ApplyFilter(): void {

    this.route.navigateByUrl(`Customer/PFilter/${this.FilterForm.controls["CategoryID"].value}/${this.FilterForm.controls["Location"].value}`)
  }
  getAllBlogs(){
    this.BlogsSer.GetLatestThree().subscribe((result) =>{
      if(result.isSuccceed){
        this.blogs = result.data;
        // console.log(this.blogs);
      }
      });
  }
  getCounterCategory(id:number){
  this.placeser.GetCounterForPlace(id).subscribe(
    result=>{
      if(result.isSuccceed){
        this.CategoryCounter.push(result.data);
      }
    }
  )
  }
  getAllCounters(){
    this.getCounterCategory(this.categories[0].id)
    this.getCounterCategory(this.categories[1].id)
    this.getCounterCategory(this.categories[4].id)
    this.getCounterCategory(this.categories[2].id)
  }
  GotoCustomerFilter(id:number):void{
      this.route.navigateByUrl(`Customer/PFilter/${id}/""`)
  }
}
