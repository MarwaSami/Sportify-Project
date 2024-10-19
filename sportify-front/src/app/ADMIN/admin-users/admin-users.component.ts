import { count } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AdminService, User } from '../Services/Admin.service';
import { PagingConfig } from '../models/pagingConfig';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],

})
export class AdminUsersComponent implements OnInit {

currentPage:number  = 1;
itemsPerPage: number = 5;
totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  users :User[] =[];

  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(private adminUserService: AdminService){
    this.getUsers();

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getUsers(){
    this.adminUserService.getAllCustomers(this.pagingConfig.itemsPerPage,this.pagingConfig.currentPage).subscribe(
      result=>{
        console.log(result);
        this.users=result.data;
        this.pagingConfig.totalItems = result.count;
      }
     );
    }

  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getUsers();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getUsers();
  }



  ngOnInit() {}


}
