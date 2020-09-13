import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UnsignedUserService } from 'src/app/services/unsigned/unsigned-user.service';

import { Office } from 'src/app/models/Office';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-unsigned-rac-services',
  templateUrl: './unsigned-rac-services.component.html',
  styleUrls: ['./unsigned-rac-services.component.css'],
})
export class UnsignedRacServicesComponent implements OnInit {
  allOffices: Office[];
  allCars: Car[];
  userRole = '';
  racCompanyId = '';
  racCompanyName = '';
  racCompanyAddress = '';
  racCompanyDescription = '';
  racCompanyPhoneNumber = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private unsignedService: UnsignedUserService
  ) {
    try {
      this.userRole = this.authService.getUserRole();
    } catch {
      this.userRole = 'NonRegistered';
    }

    this.racCompanyId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getRacCompanyInfo();

    this.getRacCompanyOffices();

    this.getRacCompanyCars();
  }

  getRacCompanyInfo() {
    this.unsignedService
      .getRacCompanyInfo(this.racCompanyId)
      .subscribe((data) => {
        this.racCompanyName = data.rac.companyName;
        this.racCompanyAddress = data.rac.adress;
        this.racCompanyDescription = data.rac.description;
        this.racCompanyPhoneNumber = data.rac.phoneNumber;
        console.log(data.rac);
      });
  }

  getRacCompanyOffices() {
    this.unsignedService
      .getRacCompanyOffices(this.racCompanyId)
      .subscribe((data) => {
        this.allOffices = data;
        console.log(this.allOffices);
      });
  }

  getRacCompanyCars() {
    this.unsignedService
      .getRacCompanyCars(this.racCompanyId)
      .subscribe((data) => {
        this.allCars = data;
        console.log(this.allCars);
      });
  }

  ngOnInit(): void {}
}
