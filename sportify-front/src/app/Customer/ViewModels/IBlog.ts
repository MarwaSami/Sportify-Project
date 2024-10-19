export interface IBlogs{
  id:number;
  imgUrl:string;
  title:string;
  content:string;
  date:string;
  tags:string; 
  categoryName:[]
}
export interface IBlog{
  id:number
  categoryID:number;
  imgUrl:string;
  title:string;
  content:string;
}
