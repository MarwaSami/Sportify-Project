import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/Customer/Services/blogs.service';
import { IBlogs } from 'src/app/Customer/ViewModels/IBlog';
import { Icategory } from 'src/app/Shared/ViewModels/Icategory';

@Component({
  selector: 'app-Blog-Details',
  templateUrl: './Blog-Details.component.html',
  styleUrls: ['./Blog-Details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog: IBlogs = { content: '', date: "", id: 0, imgUrl: "", title: "", tags: "", categoryName: [] };
  data: FormData = new FormData()
  tags: string [] = [];
  categories!: Array<Icategory>
  constructor(private route: ActivatedRoute ,private service:BlogsService) {
    this.route.params.subscribe(params => {
      const blogId = params['id'];
      this.service.getBlog(blogId).subscribe({
        next: (data) => {
          this.blog = data.data as IBlogs;
          console.log(this.blog.tags.split(" "));

            this.blog.tags.split(" ").forEach(i=>{

              this.tags.push(i);
          })
        },
        error: (errorMessage) => console.log("Error", errorMessage),
        complete: () => console.log("Complete")
      });
        // Send the blogId to your backend here
        console.log('Blog ID:', blogId);
        // You can make an API request to send the blogId to your backend

    });
    }

  ngOnInit() {
  }

}
