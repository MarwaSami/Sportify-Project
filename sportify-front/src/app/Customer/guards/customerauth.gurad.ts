import { role } from '../../Shared/ViewModels/role';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuard implements CanActivate {
  constructor(private router: Router, private _snackBar: ToastrService) {
  }
  canActivate(route: ActivatedRouteSnapshot, userurl: RouterStateSnapshot): boolean {
    // this.config.verticalPosition = "top";
    // this.config.duration=500;
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('role') == role.Customer.toString()) {
        return true
      }
      // this._snackBar.warning("You are not authorize to these page", "Ok",
      // {
      //   horizontalPosition: "center",
      //   verticalPosition: "top",
      // });
            this._snackBar.warning("You are not authorize to these page", "Authorize issue");
      setTimeout(
        () => {
          this.router.navigate(["signin", userurl.url])
        }
        , 1000
      )
      return false
    }
    else {
      this._snackBar.warning("You are not logined user,Please Login", "Authentication issue");
      setTimeout(
        () => {
          this.router.navigate(["signin", userurl.url])
        }
        , 1000
      )
      return false
    }
  }
}
