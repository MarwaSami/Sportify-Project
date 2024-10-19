import { IFilterPlace } from './../../ViewModels/IFilterPlace';
import { FacilitesService } from '../../../Shared/Services/facilites.service';
import { Router } from '@angular/router';
import { Iplace } from '../../../Shared/ViewModels/IPlace';
import { AfterViewInit, Component, Input } from '@angular/core';
import { IFacilities } from '../../../Shared/ViewModels/IFacilities';
@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.css']
})
export class FilterCardComponent  {
  @Input() place?:IFilterPlace;

  facilities:Array<IFacilities>=[];
  constructor(private route:Router){
  }
}
