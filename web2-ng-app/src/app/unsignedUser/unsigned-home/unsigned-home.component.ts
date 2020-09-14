import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarReservation } from 'src/app/models/CarReservation';
import { RentACarCompany } from 'src/app/models/RentACarCompany';
import { AuthService } from 'src/app/services/auth.service';
import { SignedUserService } from 'src/app/services/signed/signed-user.service';
import { UnsignedUserService } from 'src/app/services/unsigned/unsigned-user.service';

@Component({
  selector: 'app-unsigned-home',
  templateUrl: './unsigned-home.component.html',
  styleUrls: ['./unsigned-home.component.css'],
})
export class UnsignedHomeComponent implements OnInit {
  rateTransactionForm: FormGroup;
  userRole = '';
  allReservations: CarReservation[];
  allCarCompanies: RentACarCompany[];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private unsignedService: UnsignedUserService,
    private signedService: SignedUserService
  ) {
    this.rateTransactionForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });

    try {
      this.userRole = this.authService.getUserRole();
    } catch {
      this.userRole = 'NonRegistered';
    }

    this.GetAllCarCompanies();
    this.GetAllUserCarReservations();
  }

  GetAllCarCompanies() {
    this.unsignedService.getCarCompanies().subscribe((data) => {
      this.allCarCompanies = data;
      console.log(data);
    });
  }

  GetAllUserCarReservations() {
    this.signedService
      .getAllUserCarReservations(this.authService.getUserId())
      .subscribe((data) => {
        this.allReservations = data;
        console.log(data);
      });
  }

  getReservationStatus(date: string): string {
    let endDate = new Date(date);

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var retVal = this.compareDate(today, endDate);
    if (retVal == 0 || retVal == -1) {
      return 'RESERVED';
    } else {
      return 'ENDED';
    }
  }

  compareDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;
  }

  rateTransaction() {
    console.log(this.rateTransactionForm.value);
  }

  ngOnInit(): void {}
}
