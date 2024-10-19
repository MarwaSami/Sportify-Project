import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { role } from './Shared/ViewModels/role';
import { LoggedUser } from './Shared/Services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class TrainerOwnerService {
    loggedSubject: BehaviorSubject<LoggedUser | null>;

    constructor(private toastr: ToastrService) {
        this.loggedSubject = new BehaviorSubject<LoggedUser | null>(this.getCurrentUser());
    }

    getCurrentUser(): LoggedUser | null {
        if (localStorage.getItem("token") !== null) {
            const current: LoggedUser = {
                Id: 0,
                Name: "",
                img: "",
                token: "",
                role: role.Trainer
            };
            const storedRole = localStorage.getItem("role");
            current.role = storedRole == "2" ? role.Owner : storedRole == "3" ? role.Trainer : storedRole == "1" ? role.Customer:role.Admin;
            current.token = localStorage.getItem("token") || "";
            return current;
        } else {
            return null;
        }
    }
}