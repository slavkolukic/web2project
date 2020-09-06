import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unsigned-home',
  templateUrl: './unsigned-home.component.html',
  styleUrls: ['./unsigned-home.component.css'],
})
export class UnsignedHomeComponent implements OnInit {
  userRole = '';
  constructor(private authService: AuthService) {
    try {
      this.userRole = this.authService.getUserRole();
    } catch {
      this.userRole = 'NonRegistered';
    }
  }

  ngOnInit(): void {}
}
