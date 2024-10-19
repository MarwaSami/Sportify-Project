import { ActivelinksService } from './../../Services/activelinks.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router:Router,private alinkser:ActivelinksService){

  }
gotoservice(){
  this.alinkser.isOurserivce.next(true);
  this.router.navigateByUrl('');
  }
gototestimonials(){
  this.alinkser.istestimonials.next(true);
  this.router.navigateByUrl('');
}
}

