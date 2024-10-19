import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/Customer/Services/Blog.service';
import { IBlog } from 'src/app/Customer/ViewModels/IBlog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  pageSize:number=4;
  pageIndex:number=1;
  count:number=0;
  blogsList:Array<IBlog> = [{
    id:0,
    title:"",
    content:"",
    imgUrl:"fsdf",
    categoryID:0
  }]
  constructor(private BlogsSer:BlogService,
    private router:Router) { }

  ngOnInit() {
  this.getAllblogs();
  }
   // for pagination
   changPage(data: any) {
    console.log(data);
    this.pageIndex = data;
    this.getAllblogs();
  }
  getAllblogs(){
    this.BlogsSer.GetAllBlogs(this.pageSize,this.pageIndex).subscribe((result =>{
      this.blogsList = result.data.data;
      this.pageSize=result.data.pageSize;
      this.pageIndex=result.data.pageIndex;
      this.count=result.data.count;
      console.log(this.blogsList);
      }))
  }
}
