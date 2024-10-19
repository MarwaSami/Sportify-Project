import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/Admin.service';
import { PagingConfig } from '../models/pagingConfig';



@Component({
  selector: 'app-admin-owners',
  templateUrl: './admin-owners.component.html',
  styleUrls: ['./admin-owners.component.css']
})
export class AdminOwnersComponent implements OnInit {

  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  owners = new Array<any>();

  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(private adminUserService: AdminService){
    this.getOwners();

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getOwners(){
    this.adminUserService.getAllOwners(this.pagingConfig.itemsPerPage,this.pagingConfig.currentPage).subscribe(
      result=>{
        console.log(result.data);
        this.owners=result.data;
        this.pagingConfig.totalItems = result.data.length;
      }
     );
    }

  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getOwners();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getOwners();
  }


  
  ngOnInit() {}


}