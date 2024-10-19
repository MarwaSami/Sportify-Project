import { Component, OnInit } from '@angular/core';
import { ITrainerCard, ITrainerFilter } from '../../ViewModels/ITrainer-Filter';
import { TrainingFilterService } from '../../Services/Training-Filter.service';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/Owner/Components/TRAINER/services/trainer.service';
import { ISearchTrainer } from '../../ViewModels/ITSearch';
import { ITFilter } from '../../ViewModels/ITFilter';
import { Category } from 'src/app/Owner/ViewModels/Category';
import { Icategory } from 'src/app/Shared/ViewModels/Icategory';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-Trainer-Filter',
  templateUrl: './Trainer-Filter.component.html',
  styleUrls: ['./Trainer-Filter.component.css', './Trainer-Filter-Tablet-component.css', './Trainer-Filter-Mobile-component.css']
})
export class TrainerFilterComponent implements OnInit {
  // get allcategory
  cats: Array<Icategory> = [];
  // get all location
  govArray: string[] = [];
  filter: ITFilter = this.ResetFilter();
  search: ISearchTrainer = this.ResetSearch();
  constructor(
    private router: Router,
    private TrainerSer: TrainingFilterService, private TrainerServ: TrainerService,private toaster:ToastrService
    ,private cateservice:CategoriesService) {
    this.cateservice.getAll.subscribe(
      result => {
        if (result.isSuccceed) {
          this.cats = result.data;
        }
      }
    );
    this.TrainerServ.GetCities().subscribe(
      result => {
          if(result.isSuccceed){
            this.govArray = result.data;
          }
      }
    )
  }
  ngOnInit() {
    setTimeout(()=>{
      this.getResult()
    },2000)
  }
  // Search Method
  // Adjust search method
  searchbylocationordatetimeorcateid(location: any, datetime: any, CategoryID: any) {
    if (location.value != '') {
      this.search.City = location.value;
    }
    if (datetime.value != '') {
      // const date = new Date(datetime.value);
      // let datePart = date.toISOString().split('T')[0];
      // let timePart = date.toTimeString().split(' ')[0];
      // console.log("Date:", datePart);
      // console.log("Time:", timePart);
      // console.log(datetime.value);

      this.search.AvailableTime = datetime.value;
    }
    if (CategoryID.value != 'all') {
      this.search.CategoryID = parseInt(CategoryID.value);
    }
    if (CategoryID.value == 'all' && datetime.value == '' && location.value == '') {
      this.toaster.warning('you must enter valid input');
    }
   this.searchby();
  }
  //pagination
  data: ITrainerCard[] = [
  ]
  pageSize: number = 2;
  pageIndex: number = 1;
  count: number = 0;
  FilteredTrainersByCat(isChecked: boolean, value: string) {
    if (isChecked) {
      // const trainersToAdd = this.tempoTrainers.filter(i => i.Cat == value);
      // this.filteredTrainers2 = this.filteredTrainers2.concat(trainersToAdd)
      // this.trainers = this.filteredTrainers2
      this.filter.CategoryID.push(parseInt(value));
    }else {
      let index=this.filter.CategoryID.indexOf(parseInt(value))
      this.filter.CategoryID.splice(index,1)
    }
    this.filterby()
  }
  FilteredTrainersByGov(isChecked: boolean, value: string) {
      if (isChecked) {
       this.filter.City.push(value);
      } if (isChecked == false) {
        let index=this.filter.City.indexOf(value)
        this.filter.City.splice(index,1)
    }
    this.filterby();
  }
  FilteredTrainersByRate(isChecked: boolean, value: number) {
    if (isChecked) {
      this.filter.RateValue.push(value);
    } if (isChecked == false) {
      let index=this.filter.RateValue.indexOf(value)
      this.filter.RateValue.splice(index,1)
    }
    this.filterby();
  }
  FilteredTrainersBySurface(isChecked: boolean, value: string) {
    if (isChecked) {
      this.filter.SurfaceID.push(parseInt(value))
      console.log(this.filter);
    } if (isChecked == false) {
      let index=this.filter.SurfaceID.indexOf(parseInt(value))
      this.filter.SurfaceID.splice(index,1)
    }
    this.filterby();
  }
  showdetails(e: any) {
    console.log(e.target.id);
    this.router.navigateByUrl('Customer/TrainerSchedule/' + e.target.id);
  }

  changPage(data: any) {
    this.pageIndex = data

    this.getResult()
  }
  //Get All trainers
  getResult() {
    this.TrainerServ.GetTrainers(this.pageSize, this.pageIndex).subscribe({
      next: (responce) => {
        console.log("trainers", responce.data);
        this.data = responce.data
        this.count = responce.count
        this.pageIndex = responce.pageIndex
        this.pageSize = responce.pageSize

      }
    })
  }
  // Search,Filter
  searchby(){
    this.TrainerServ.SearchTrainer(this.search).subscribe(
      result=>{
        if(result.isSuccceed){
          this.data=result.data.data;
          this.count=result.data.count;
          this.pageIndex=result.data.pageIndex;
          this.pageSize=result.data.pageSize;
        }
      }
    )
  }
  filterby(){
    this.TrainerServ.FilterTrainer(this.filter).subscribe(
      result=>{
        if(result.isSuccceed){
          this.data=result.data.data;
          this.count=result.data.count;
          this.pageIndex=result.data.pageIndex;
          this.pageSize=result.data.pageSize;
        }
      }
    )
  }  //Reset Filter and Search
  ResetFilter(): ITFilter {
    return {
      OrderBy: "ID",
      IsAscending: false,
      CategoryID: [],
      RateValue: [],
      City: [],
      SurfaceID: [],
      pageIndex: 1,
      pageSize: 6
    }
  }
  ResetSearch(): ISearchTrainer {
    let date = new Date();
    return {
      City: "",
      AvailableTime: date.toLocaleString(),
      CategoryID: 0,
      pageSize:this.pageSize,
      pageIndex:this.pageIndex
    }
  }
}
