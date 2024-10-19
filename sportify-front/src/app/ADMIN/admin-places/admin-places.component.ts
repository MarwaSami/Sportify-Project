import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/Admin.service';
import { PagingConfig } from '../models/pagingConfig';

@Component({
  selector: 'app-admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.css']
})
export class AdminPlacesComponent implements OnInit {

    
currentPage:number  = 1;
itemsPerPage: number = 5;
totalItems: number = 0;

tableSize: number[] = [5, 10, 15, 20];
places = new Array<any>();

pagingConfig: PagingConfig = {} as PagingConfig;

constructor(private adminUserService: AdminService){
  this.getPlaces();

  this.pagingConfig = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage,
    totalItems: this.totalItems
  }
}

getPlaces(){
  this.adminUserService.getAllPlaces(this.pagingConfig.itemsPerPage,this.pagingConfig.currentPage).subscribe(
    result=>{
      console.log(result.data);
      this.places=result.data;
      this.pagingConfig.totalItems = result.data.length;
    }
   );
  }

onTableDataChange(event:any){
  this.pagingConfig.currentPage  = event;
  this.getPlaces();
}
onTableSizeChange(event:any): void {
  this.pagingConfig.itemsPerPage = event.target.value;
  this.pagingConfig.currentPage = 1;
  this.getPlaces();
}



ngOnInit() {}


}