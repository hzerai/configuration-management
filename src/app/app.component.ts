import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  current_user: string;

  constructor() {
    this.current_user = window.sessionStorage.getItem('cm_current_user');
  }

  login(user) {
    window.sessionStorage.setItem('cm_current_user', user);
    this.current_user = user;
  }

  logout() {
    window.sessionStorage.removeItem('cm_current_user');
    this.current_user = null;
  }
}
