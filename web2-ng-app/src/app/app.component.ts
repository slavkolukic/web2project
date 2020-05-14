import { Component } from '@angular/core';
import { GlobalVariables } from './common/globalVariables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web2-ng-app';

  isUserLogged(): string {
    return GlobalVariables.GetLoggedUser();
  }

  logOutUser(): void {
    GlobalVariables.loggedUser = 'unsigned';
  }
}
