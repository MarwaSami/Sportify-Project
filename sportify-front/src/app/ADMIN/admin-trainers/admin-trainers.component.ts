import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/Admin.service';
import { PagingConfig } from '../models/pagingConfig';


@Component({
  selector: 'app-admin-trainers',
  templateUrl: './admin-trainers.component.html',
  styleUrls: ['./admin-trainers.component.css']
})
export class AdminTrainersComponent implements OnInit {


currentPage:number  = 1;
itemsPerPage: number = 5;
totalItems: number = 0;

tableSize: number[] = [5, 10, 15, 20];
trainers = new Array<any>();

pagingConfig: PagingConfig = {} as PagingConfig;

constructor(private adminUserService: AdminService){
  this.getTrainers();

  this.pagingConfig = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage,
    totalItems: this.totalItems
  }
}

getTrainers(){
  this.adminUserService.getAllTrainers(this.pagingConfig.itemsPerPage,this.pagingConfig.currentPage).subscribe(
    result=>{
      console.log(result.data);
      this.trainers=result.data;
      this.pagingConfig.totalItems = result.data.length;
    }
   );
  }

onTableDataChange(event:any){
  this.pagingConfig.currentPage  = event;
  this.getTrainers();
}
onTableSizeChange(event:any): void {
  this.pagingConfig.itemsPerPage = event.target.value;
  this.pagingConfig.currentPage = 1;
  this.getTrainers();
}



ngOnInit() {}


}
