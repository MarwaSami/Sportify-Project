import { Component } from '@angular/core';
import { IBlog } from 'src/app/Customer/ViewModels/IBlog';
import { BlogService } from 'src/app/Customer/Services/Blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogs:Array<IBlog>=[];
  pageSize:number=4;
  pageIndex:number=1;
  count:number=0;
  constructor(private BlogsSer:BlogService)
  {
   this.getAllBlogs();
  }
   // for pagination
   changPage(data: any) {
    console.log(data);
    this.pageIndex = data;
      this.getAllBlogs();
  }
  getAllBlogs(){
    this.BlogsSer.GetAllBlogs(this.pageSize,this.pageIndex).subscribe((result) =>{
      if(result.isSuccceed){
        this.blogs = result.data.data;
        this.pageSize=result.data.pageSize;
        this.pageIndex=result.data.pageIndex;
        this.count=result.data.count;
        console.log(this.blogs);

      }
      });
  }
}
