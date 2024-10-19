import { ActivatedRoute, Route, Router } from '@angular/router';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { Component } from '@angular/core';
import { ICard } from '../../ViewModels/ICard';
import { PitchService } from '../../Services/pitch.service';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { IFilterPlace } from 'src/app/Customer/ViewModels/IFilterPlace';
import { IMYPlace } from '../../ViewModels/IMyPlace';
import { EditplaceService } from '../../Services/editplace.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-see-my-places',
  templateUrl: './see-my-places.component.html',
  styleUrls: ['./see-my-places.component.css']
})
export class SeeMyPlacesComponent {
  pitches: Array<IMYPlace> = [];
  countplaces: number = 0;
  constructor(private placser: PlacesService,
    private editser: EditplaceService, private route: Router, private toaster: ToastrService) {
    //this.pitches=this._Service.PitchCard;
    this.placser.OwnerPlaces(4, 1).subscribe(
      result => {
        if (result.isSuccceed) {
          this.pitches = result.data.data
          this.countplaces = this.pitches.length;
        }
      }
    )

  }
  Add() {
    if (this.countplaces < 2) {
      this.editser.Editplace(-1);
      this.route.navigateByUrl('/Owner/addplace');
    }
    else {
      this.toaster.warning("You can't add more places with free membership, you need to change your membership","Warning")
      this.route.navigateByUrl('/Owner/SettingOwner')
    }
  }


}
