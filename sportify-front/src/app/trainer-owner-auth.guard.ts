import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanDeactivate, CanLoad, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainerOwnerService } from './trainer-owner.service';
import { role } from './Shared/ViewModels/role';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class TrainerOwnerAuthGuard implements CanActivate, CanDeactivate<unknown>, CanLoad {

    constructor(private router: Router, private trainerOwnerService: TrainerOwnerService,private toastr: ToastrService) {
    }

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       // console.log(state.url);
        const currentUser = this.trainerOwnerService.getCurrentUser();
        if (currentUser) {
            if (currentUser.role === role.Trainer || currentUser.role === role.Owner) {
                return true;
            }
            this.toastr.warning("You are not authorized to go to this page");
            setTimeout(()=>{
                this.router.navigate(["signin", state.url]);
            },2000)
            return false;

        } else {
            this.toastr.warning("You are not logged in. Please login.");
            setTimeout(()=>{
                this.router.navigate(["signin", state.url]);
            },2000)
            return false;
        }
    }
}
