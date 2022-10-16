import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  current_user: string;
  invalid: boolean = false;

  @Output('user')
  user = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  login() {
    if (!this.current_user || !this.current_user.endsWith('@vermeg.com')) {
      this.invalid = true;
    } else {
      this.user.emit(this.current_user.replace('@vermeg.com', ''));
    }
  }
}
