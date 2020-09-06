import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unsigned-rac-services',
  templateUrl: './unsigned-rac-services.component.html',
  styleUrls: ['./unsigned-rac-services.component.css'],
})
export class UnsignedRacServicesComponent implements OnInit {
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
