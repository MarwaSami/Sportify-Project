import { AuthService, LoggedUser } from './../../../Shared/Services/auth.service';
import { Component } from '@angular/core';
import { SignInComponent } from '../../../SignIn/SignIn.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser:LoggedUser|null = null
  constructor(private route: ActivatedRoute,private router :Router,private AuthService:AuthService)
  {
    AuthService.loggedSubject.subscribe(data=>{
      this.currentUser = data;
    })
  }

  navTosignin()
  {
  this.router.navigate(['/signin','/']);
  }
  navTosignup()
  {
      this.router.navigate(['/signup']);

  }
  logout(){
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    this.AuthService.loggedSubject.next(null)
    location.reload()
  }

}
