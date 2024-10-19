import { Component } from '@angular/core';
import { CountService } from 'src/app/Shared/Services/count.service';
import { IAdminCount } from 'src/app/Shared/ViewModels/IAdminCount';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css','./about-us-tablet.component.css','./about-us-mobile.component.css']
})
export class AboutUsComponent {
 count:IAdminCount=this.countser.resetIAdminCount();
 constructor(private countser:CountService){
 this.getALL();
 }
 getALL(){
  this.countser.GetALLCount().subscribe(
    res=>{
      this.count=res;
    }
  )
 }
}
