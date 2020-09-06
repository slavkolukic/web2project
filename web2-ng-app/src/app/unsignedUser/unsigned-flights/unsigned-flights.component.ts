import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unsigned-flights',
  templateUrl: './unsigned-flights.component.html',
  styleUrls: ['./unsigned-flights.component.css'],
})
export class UnsignedFlightsComponent implements OnInit {
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
