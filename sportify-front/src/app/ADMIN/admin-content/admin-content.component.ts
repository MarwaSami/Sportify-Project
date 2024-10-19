import { IAdminCount } from './../../Shared/ViewModels/IAdminCount';
import { Component, OnInit } from '@angular/core';
import { CountService } from 'src/app/Shared/Services/count.service';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {
  AdminCount:IAdminCount;
  constructor(private countser:CountService) {
    this.AdminCount=this.countser.resetIAdminCount();
    this.getALL();
  }

  ngOnInit() {
  }

  getALL(){
    this.countser.GetALLCount().subscribe(res=>{
      this.AdminCount=res;
    })
  }
}
