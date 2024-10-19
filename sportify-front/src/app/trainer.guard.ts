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
export class trainerGuard implements CanActivate {

    constructor(private router: Router, private trainerOwnerService: TrainerOwnerService,private toastr: ToastrService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(state.url);
        const currentUser = this.trainerOwnerService.getCurrentUser();
        if (currentUser && currentUser.role === role.Trainer) {
            return true;
        }
        this.toastr.warning("You are not authorized to go to this page");
        this.router.navigate(["signin", state.url]);
        // setTimeout(()=>{
        //     
        // },2000)
        return false;
    }
}