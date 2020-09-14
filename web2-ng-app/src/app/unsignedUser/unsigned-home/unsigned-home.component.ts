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
  userRole = '';
  allReservations: CarReservation[];
  allCarCompanies: RentACarCompany[];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private unsignedService: UnsignedUserService,
    private signedService: SignedUserService
  ) {
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
      return 'ACTIVE';
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

  rateService(resId: string) {
    var rating = (<HTMLInputElement>document.getElementById(resId)).value;
    console.log(resId);
    console.log(rating);

    if (Number(rating) < 1 || Number(rating) > 5) {
      alert('Rating can only be from 1 to 5!');
    } else if (rating == '' || rating == 'null' || rating == null) {
      alert('Please insert rating!');
    } else {
      var body = {
        reservationId: resId,
        carRating: rating,
      };

      this.signedService.rateService(body).subscribe((data) => {
        console.log(data.message);
        alert(data.message);
      });
    }
  }

  ngOnInit(): void {}
}
