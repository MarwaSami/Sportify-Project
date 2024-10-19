import { Component, Input } from '@angular/core';
import { IBlog } from 'src/app/Customer/ViewModels/IBlog';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
 @Input() Blog!:IBlog;
 constructor()
 {
  console.log(this.Blog);

 }

}
