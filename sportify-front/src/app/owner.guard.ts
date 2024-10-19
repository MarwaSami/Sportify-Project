import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainerOwnerService } from './trainer-owner.service';
import { role } from './Shared/ViewModels/role';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ownerGuard implements CanActivate {

    constructor(private router: Router, private trainerOwnerService: TrainerOwnerService,private toastr: ToastrService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //console.log(state.url);
        const currentUser = this.trainerOwnerService.getCurrentUser();
        if (currentUser && currentUser.role === role.Owner) {
            return true;
        }
        this.toastr.warning("You are not authorized to go to this page");
        setTimeout(()=>{
            this.router.navigate(["signin", state.url]);
        },2000)
        return false;
    }
}
