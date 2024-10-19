import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../Services/theme.service';
import { TrainerOwnerService } from 'src/app/trainer-owner.service';
import { LoggedUser } from 'src/app/Shared/Services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  darkMode: boolean = false;
  currentUser: LoggedUser | null = null;
  constructor(private _ThemeService: ThemeService, private roleServ: TrainerOwnerService) {
    roleServ.loggedSubject.subscribe(data => {
      this.currentUser = data
    })
  }

  ngOnInit(): void {
    this._ThemeService.darkMode.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
      this.toggleTheme(darkMode);
    });

    const sideLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

    sideLinks.forEach((item: HTMLAnchorElement) => {
      const li: HTMLLIElement = item.parentElement as HTMLLIElement;
      item.addEventListener('click', () => {
        sideLinks.forEach((i: HTMLAnchorElement) => {
          i.parentElement!.classList.remove('active');
        })
        li.classList.add('active');
      })
    });

    const menuBar: HTMLElement = document.querySelector('.content nav .bx.bx-menu') as HTMLElement;
    const sideBar: HTMLElement = document.querySelector('.sidebar') as HTMLElement;

    menuBar.addEventListener('click', () => {
      sideBar.classList.toggle('close');
    });

    const searchBtn: HTMLButtonElement = document.querySelector('.content nav form .form-input button') as HTMLButtonElement;
    const searchBtnIcon: HTMLElement = document.querySelector('.content nav form .form-input button .bx') as HTMLElement;
    const searchForm: HTMLElement = document.querySelector('.content nav form') as HTMLElement;

    searchBtn.addEventListener('click', function (e: MouseEvent) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        sideBar.classList.add('close');
      } else {
        sideBar.classList.remove('close');
      }
      if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
    });
  }
  LogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("role")
}

  toggleTheme(checked: boolean): void {
    if (checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
}

}
