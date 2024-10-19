import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkMode = this.darkModeSubject.asObservable();

  constructor() { }

  toggleTheme(checked: boolean): void {
    this.darkModeSubject.next(checked);
  }
}
