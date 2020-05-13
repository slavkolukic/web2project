import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../common/globalVariables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  SetUserAsLogged(): void {
    GlobalVariables.loggedUser = true;
  }
}
