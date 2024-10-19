import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { FacilitesService } from 'src/app/Shared/Services/facilites.service';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { IFacilities } from 'src/app/Shared/ViewModels/IFacilities';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { Icategory } from 'src/app/Shared/ViewModels/Icategory';
import { IFilterPlace } from '../../ViewModels/IFilterPlace';
import { IFilter } from '../../ViewModels/IFilter';
import { ISearchPlace } from '../../ViewModels/ISearchPlace';
import { Time } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css', './customer-filer-tablet-component.css', './customer-filter-mobile-component.css']
})
export class CustomerFilterComponent {
  positions: { longitude: number, latitude: number } = { latitude: 0, longitude: 0 };
  categories: Array<Icategory> = [];
  pageSize: number = 8;
  pageIndex = 1;
  count: number = 0;
  places: Array<IFilterPlace> = [];
  filter: IFilter = this.ResetFilter();
  facilities: Array<IFacilities> = [];
  cities: Set<string> = new Set<string>();
  numbers: Array<any> = [1, 2, 3, 4, 'N/A'];
  search: ISearchPlace = this.ResetSearch();
  isallchecked: boolean;
  FilterpageState: placeFilterState = placeFilterState.Index;
  constructor(private placeser: PlacesService, private cateservice: CategoriesService,
    private facser: FacilitesService, private activeroute: ActivatedRoute, private toaster: ToastrService) {
    this.getPlace_FacilitesandCategroies();
    this.isallchecked = true;
    activeroute.params.subscribe(
      (params) => {
        //console.log(params["CategoryID"]);
        if (params["CategoryID"] != " " || params["Location"] != " ") {
          this.search.City = params["Location"]
          this.search.CategoryID = parseInt(params["CategoryID"])
          this.FilterpageState = placeFilterState.Search;
          this.getplacesBySearch()
          params["Location"] = ""
          params["CategoryID"] = ""
        }
        else {
          this.getAllPlaces();

        }
      }
    )
  }
  // This Function is listen to API and get data of category,city,Place,facility
  getPlace_FacilitesandCategroies() {
    this.getAllCategories();
    // get all cities
    this.placeser.getallplacescity().subscribe(
      result => {
        if (result.isSuccceed) {
          this.cities = result.data;
        }
      }
    )
    // get all facilites
    this.facser.getAll.subscribe(
      result => {
        if (result.isSuccceed) {
          this.facilities = result.data
        }
        console.log(result.data);


      }
    )
  }
  getAllCategories() {
    this.cateservice.getAll.subscribe(
      result => {
        if (result.isSuccceed) {
          this.categories = result.data;
        }
      }
    );
  }
  // Get Current Location
  getlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        this.getPoistion(p)
      }, this.getError);
    } else {
      alert("not supported");
    }
  }
  getPoistion(poistion: any) {
    this.positions.latitude = poistion.coords.latitude as number
    this.positions.longitude = poistion.coords.longitude as number
    console.log("long in getlocation " + this.positions.longitude);
    console.log("lat in getlocation" + this.positions.latitude);

  }
  getError(msg: any) {
    alert(msg);
  }
  // Search Method
  // Adjust search method
  searchbylocationordatetimeorcateid(location: any, datetime: any, CategoryID: any) {
    if (location.value != '') {
      this.search.City = location.value;
    }
    if (datetime.value != '') {
      const date = new Date(datetime.value);
      let datePart = date.toISOString().split('T')[0];
      let timePart = date.toTimeString().split(' ')[0];
      console.log("Date:", datePart);
      console.log("Time:", timePart);
      console.log(datetime.value);

      this.search.AvailableTime = datetime.value;
    }
    if (CategoryID.value != 'all') {
      this.search.CategoryID = parseInt(CategoryID.value);
    }
    if (CategoryID.value == 'all' && datetime.value == '' && location.value == '') {
      this.toaster.warning('you must enter valid input');
    }
   this.getplacesBySearch();
   this.FilterpageState=placeFilterState.Search;
  }
  // Filter Method
  filterbycategory(e: any, elem: any) {
    this.isallchecked = false;
    let cate_id: number;
    if (e.target.value == 'all' || (e.target.id == 'all' && e.target.checked)) {
      this.isallchecked = true;
      this.getAllPlaces();
      this.FilterpageState=placeFilterState.Index;
    }
    else if (e.target.checked && !this.isallchecked) {
      cate_id = parseInt(e.target.id)
      this.filter.CategoryID.push(cate_id)
      this.getplacesbyFilter()
      this.FilterpageState=placeFilterState.Filter;
    }
    if (!e.target.checked) {
      cate_id = parseInt(e.target.id)
      let i = this.filter.CategoryID.indexOf(cate_id);
      this.filter.CategoryID.splice(i)
      this.getplacesbyFilter()
      this.FilterpageState=placeFilterState.Filter;
    }

  }
  filterbycity(e: any, elem: any) {
    if (e.target.checked) {
      this.filter.City.push(e.target.id)
    }
    else {
      let index = this.filter.City.indexOf(e.target.id)
      this.filter.City.splice(index);
    }
    this.getplacesbyFilter();
    this.FilterpageState=placeFilterState.Filter;
  }
  filterbyfacilites(e: any) {
    if (e.target.checked) {
      this.filter.FacilityID.push(parseInt(e.target.id))
    }
    else {
      let index = this.filter.FacilityID.indexOf(parseInt(e.target.id))
      this.filter.FacilityID.splice(index);
    }
    this.getplacesbyFilter();
    this.FilterpageState=placeFilterState.Filter;
  }
  filterbySurface(e: any) {
    if (e.target.checked) {
      this.filter.SurfaceID.push(parseInt(e.target.id))
    }
    else {
      let index = this.filter.SurfaceID.indexOf(parseInt(e.target.id))
      this.filter.SurfaceID.splice(index);
    }
    this.getplacesbyFilter();
    this.FilterpageState=placeFilterState.Filter;
  }
  filterbytype(e: any) {
    if (e.target.checked) {
      this.filter.TypeID.push(parseInt(e.target.id))
    }
    else {
      let index = this.filter.TypeID.indexOf(parseInt(e.target.id))
      this.filter.TypeID.splice(index);
    }
    this.getplacesbyFilter();
    this.FilterpageState=placeFilterState.Filter;
  }
  filterbyreview(e: any) {
    if (e.target.checked) {
      this.filter.RateValue.push(parseInt(e.target.id))
    }
    else {
      let index = this.filter.RateValue.indexOf(parseInt(e.target.id))
      this.filter.RateValue.splice(index);
    }
    this.getplacesbyFilter();
    this.FilterpageState=placeFilterState.Filter;
  }
  filterbyNumber(e: any) {
    if (e.target.checked) {
      if (e.target.id != 'N/A') {
        this.filter.Capacity.push(parseInt(e.target.id))
        this.getplacesbyFilter();
        this.FilterpageState=placeFilterState.Filter
      }
      else{
        this.getAllPlaces();
        this.FilterpageState=placeFilterState.Index
      }

    }
  }
  filterbydistance(e: any) {
    if (e.target.checked) {
      this.getlocation();
      setTimeout(
        () => {
          console.log(this.positions);
          console.log("long in Fitler" + this.positions.longitude);
          console.log("lat in filter" + this.positions.latitude);
          this.filter.Lang = this.positions.longitude;
          this.filter.Lat = this.positions.latitude;
          this.filter.d = (parseInt(e.target.id))
          this.getplacesbyFilter();
          this.FilterpageState=placeFilterState.Filter;
        }
        , 5000
      )
    }
    else {
      this.filter.Lang = 0;
      this.filter.Lat = 0;
      this.filter.d = 0;
      this.getplacesbyFilter()
    }
  }
  getplacesbyFilter() {
    this.placeser.filterby(this.filter).subscribe(
      result => {
        if (result.isSuccceed) {
          this.places = result.data.data;
          this.pageSize=result.data.pageSize;
          this.pageIndex=result.data.pageIndex;
          this.count=result.data.count;
        }
      }
    )
  }
  getAllPlaces() {
    console.log("get alllll", this.pageIndex, this.pageSize);
    this.placeser.getAll(this.pageSize, this.pageIndex).subscribe(
      (result) => {
        console.log(result);
        if (result.isSuccceed) {
          //console.log(result.data);
          this.places = result.data.data;
          this.pageSize = result.data.pageSize;
          this.pageIndex = result.data.pageIndex;
          this.count = result.data.count;
        }
      }
    );
  }
  getplacesBySearch() {
    console.log(this.search);
    this.placeser.Search(this.search).subscribe(
      result => {
        if (result.isSuccceed) {
          console.log(result.data.data);

          this.places = result.data.data;
          this.pageSize=result.data.pageSize;
          this.pageIndex=result.data.pageIndex;
          this.count=result.data.count;

        }

      }
    )
  }
  ResetFilter(): IFilter {
    return {
      OrderBy: "ID",
      IsAscending: false,
      CategoryID: [],
      RateValue: [],
      Lang: 0,
      Lat: 0,
      d: 0,
      City: [],
      Capacity: [],
      TypeID: [],
      SurfaceID: [],
      FacilityID: [],
      pageIndex: 1,
      pageSize: 6
    }
  }
  ResetSearch(): ISearchPlace {
    let date = new Date();
    return {
      City: "",
      AvailableTime: date.toLocaleString(),
      CategoryID: 0,
      pageSize:this.pageSize,
      pageIndex:this.pageIndex
    }
  }

  // for pagination
  changPage(data: any) {
    console.log(data);
    this.pageIndex = data;
    if(this.FilterpageState==placeFilterState.Index)
      this.getAllPlaces();
    else if(this.FilterpageState==placeFilterState.Search){
      this.getplacesBySearch();
    }
    else{
      this.getplacesbyFilter();
    }
  }
}
enum placeFilterState {
  Search,
  Index,
  Filter
}


