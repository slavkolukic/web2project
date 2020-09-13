import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/RentACarCompany';
import { AuthService } from 'src/app/services/auth.service';
import { UnsignedUserService } from 'src/app/services/unsigned/unsigned-user.service';

@Component({
  selector: 'app-unsigned-home',
  templateUrl: './unsigned-home.component.html',
  styleUrls: ['./unsigned-home.component.css'],
})
export class UnsignedHomeComponent implements OnInit {
  userRole = '';
  allCarCompanies: RentACarCompany[];
  constructor(
    private authService: AuthService,
    private unsignedService: UnsignedUserService
  ) {
    try {
      this.userRole = this.authService.getUserRole();
    } catch {
      this.userRole = 'NonRegistered';
    }

    this.GetAllCarCompanies();
  }

  GetAllCarCompanies() {
    this.unsignedService.getCarCompanies().subscribe((data) => {
      this.allCarCompanies = data;
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
