
import { Services } from "./ServicesEnum";
export interface ICard{
  id:number;
  Img:string;
  Name:string;
  service:Array <Services>;
  price:number;

}
