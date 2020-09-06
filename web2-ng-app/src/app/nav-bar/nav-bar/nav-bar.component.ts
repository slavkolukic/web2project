import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userRole = '';
  constructor(private authService: AuthService) {
    try {
      this.userRole = this.authService.getUserRole();
    } catch {
      this.userRole = 'NonRegistered';
    }
  }

  ngOnInit(): void {}

  logOutUser(): void {
    this.authService.deleteToken();
  }
}
