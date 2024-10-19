import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { BlogService } from '../../Customer/Services/Blog.service';
import { IBlogs } from '../../Customer/ViewModels/IBlog';
import { Title } from '@angular/platform-browser';
import { CdkDialogContainer } from '@angular/cdk/dialog';
import { Category } from '../../Owner/ViewModels/Category';
import { Observable } from 'rxjs'
import { Icategory } from '../../Shared/ViewModels/Icategory';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-blog',
  templateUrl: './Add-Blog.component.html',
  styleUrls: ['./Add-Blog.component.css']
})
export class BlogComponent1 implements OnInit {
  constructor(private blogService:BlogService,private route:Router,private toast:ToastrService){
 }
 blog:IBlogs = {"content":'',"date":"","id":0,"imgUrl":"","title":"","tags":"",categoryName:[]};
 data:FormData = new FormData
 categories!:Array<Icategory>
ngOnInit(): void {
  this.blogService.GetCategories().subscribe((next) =>{
    this.categories = next.data;
  })
}
 onSubmit() {
  if (this.data.has("Title") && this.data.has("Content")){
  this.data.append("Tags",this.blog.tags)
  this.blogService.addBlog(this.data)
    .subscribe(response => {
      console.log(response);
      if(response.isSuccceed){
        this.toast.success('Blog added successfully');
        this.route.navigateByUrl('/Admin/Blogs');

      }
    })}
}
  onImageChange(file: any) {
    this.data.append('ImgUrl', <File>file.files[0],file.files[0].name);
    this.data.append('Title',this.blog.title);
this.data.append('Content',this.blog.content);
this.data.append('CategoryID',this.blog.id.toString());
  }
}


  //   Title= 'Football 20 Benefits For Your Body And Mental Health';
  // imgSource = '../../assets/images/Blog/Default.jpg';
  // blogs = ['Christiano Ronaldo', 'Players', "Soccer","Football","Teams","World Cup"];
  // addBlog(newBlog: string) {
  //   if (newBlog) {
  //     this.blogs.push(newBlog);
  //   }
  // }
  // removeBlog(blog: string) {
  //   if (blog) {
  //   const objIndex = this.blogs.findIndex(obj => obj == blog);
  //   if (objIndex > -1) {
  //     this.blogs.splice(objIndex, 1);
  //   }
  //   }
  // }

  // constructor(private formBuilder: FormBuilder) { }

  // ngOnInit() {
  // }
  // onFileChange(event:any) {
  //   console.log('Image Changed', event);
  //   if (event.target.files.length > 0) {

  //         const file = event.target.files[0];
  //         console.log('Profile Saved', file);
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = (_event:any) => {
  //        this.imgSource =  _event.target?.result;
  //   }
  //       }
  //     }
  //     onSubmit(): void {
  //       console.log("Blog succed ");
  //   }


