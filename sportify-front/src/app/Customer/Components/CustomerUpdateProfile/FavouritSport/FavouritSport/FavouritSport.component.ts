import { Component, OnInit } from '@angular/core';
import { MangeBookingService } from 'src/app/Customer/Services/MangeBooking.service';
import { IFavourite } from 'src/app/Customer/ViewModels/IFavourite';

@Component({
  selector: 'app-FavouritSport',
  templateUrl: './FavouritSport.component.html',
  styleUrls: ['./FavouritSport.component.css']
})
export class FavouritSportComponent implements OnInit {
  favSports: Array<IFavourite> = []
  constructor(private FavServ: MangeBookingService) {
    this.FavServ.GetFav().subscribe({
      next: (responce) => {
        console.log(responce);
        this.favSports = responce
      },
      error: (msg) => {
        console.log(msg);

      }
    })
  }
  ChangeStatus(item: IFavourite) {
    console.log(item);
    if (item.status == false) {
      ///add
      this.FavServ.AddFav(item.id).subscribe({
        next: (responce) => {
          console.log(responce);
          this.favSports = responce
        },
        error: (msg) => {
          console.log(msg);

        }
      })
    }
    else {
      ///remove
      this.FavServ.RemoveFav(item.id).subscribe({
        next: (responce) => {
          console.log(responce);
          this.favSports = responce
        },
        error: (msg) => {
          console.log(msg);

        }
      })
    }

  }

  ngOnInit() {
  }

}
