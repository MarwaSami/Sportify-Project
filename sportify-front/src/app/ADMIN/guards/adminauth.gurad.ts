import { role } from '../../Shared/ViewModels/role';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private _snackBar: ToastrService) {
  }
  canActivate(route: ActivatedRouteSnapshot, userurl: RouterStateSnapshot): boolean {
    // this.config.verticalPosition = "top";
    // this.config.duration=500;
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('role') == role.Admin.toString()) {
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
          if(localStorage.getItem("role")=="1"){
            userurl.url='/'
          }
          else if(localStorage.getItem("role")=="2"){
            userurl.url='Owner'
          }
          else{
              userurl.url='Trainer'
          }
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
