import { createAotUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car';
import { AuthService } from 'src/app/services/auth.service';
import { SignedUserService } from 'src/app/services/signed/signed-user.service';

@Component({
  selector: 'app-unsigned-rac-services-cars',
  templateUrl: './unsigned-rac-services-cars.component.html',
  styleUrls: ['./unsigned-rac-services-cars.component.css'],
})
export class UnsignedRacServicesCarsComponent implements OnInit {
  allCars: Car[];
  searchCarsForm: FormGroup;
  reservationOn: boolean = false;
  selectedCarType: string = 'Select car type';
  constructor(
    private signedService: SignedUserService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.searchCarsForm = this.fb.group({
      firstDayOfReservation: ['', Validators.required],
      lastDayOfReservation: ['', Validators.required],
      numberOfSeats: [
        '',
        [Validators.required, Validators.max(5), Validators.min(2)],
      ],
      typeOfCar: ['', Validators.required],
      pricePerDay: ['', Validators.required],
    });

    this.getAllCars();
  }

  getAllCars() {
    this.signedService.getAllCars().subscribe((data) => {
      this.allCars = data;
      console.log(data);
    });
  }

  saveSelectedCarType(carType: string) {
    this.selectedCarType = carType;

    this.searchCarsForm.patchValue({
      typeOfCar: carType,
    });
  }

  searchCars() {
    if (this.authService.getUserRole() != 'NonRegistered')
      this.reservationOn = true;

    this.searchCarsForm.patchValue({
      numberOfSeats: String(this.searchCarsForm.get('numberOfSeats').value),
    });
    this.searchCarsForm.patchValue({
      pricePerDay: String(this.searchCarsForm.get('pricePerDay').value),
    });

    if (this.validation()) {
      console.log(this.searchCarsForm.value);
      this.signedService
        .getFilteredCars(this.searchCarsForm.value)
        .subscribe((data) => {
          this.allCars = data;
          console.log(data);
        });
    }
  }

  resetFilters() {
    location.reload();
  }

  validation(): boolean {
    if (this.dateValidation()) {
      return true;
    }
    return false;
  }

  dateValidation(): boolean {
    var from = this.searchCarsForm.get('firstDayOfReservation').value;
    var to = this.searchCarsForm.get('lastDayOfReservation').value;

    var fromDate = new Date(from);
    var toDate = new Date(from);
    var CurrentDate = new Date();
    console.log(CurrentDate);
    CurrentDate.setHours(0, 0, 0, 0);

    if (fromDate < CurrentDate) {
      alert('Date can not be in the past!');
      return false;
    }
    if (toDate < CurrentDate) {
      alert('Date can not be in the past!');
      return false;
    }

    var from_splitted = from.split('-');
    var to_splitted = to.split('-');

    console.log(from_splitted);
    console.log(to_splitted);

    if (
      from_splitted[0] * 1 > to_splitted[0] * 1 ||
      from_splitted[1] * 1 > to_splitted[1] * 1 ||
      from_splitted[2] * 1 > to_splitted[2] * 1
    ) {
      alert('Incorrect date format!');
      return false;
    }

    return true;
  }

  makeCarReservation(carIdd: string, pricePerDayy: number) {
    if (
      this.searchCarsForm.get('firstDayOfReservation').value == '' ||
      this.searchCarsForm.get('lastDayOfReservation').value == ''
    ) {
      alert('Dates are required in order to make reservation!');
    } else {
      var data = {
        firstDayOfReservation: this.searchCarsForm.get('firstDayOfReservation')
          .value,
        lastDayOfReservation: this.searchCarsForm.get('lastDayOfReservation')
          .value,
        pricePerDay: String(pricePerDayy),
        carId: carIdd,
        ownerId: this.authService.getUserId(),
      };

      this.signedService.makeCarReservation(data).subscribe((data) => {
        alert(data.message);
      });
    }
  }

  getCarRating(ratings: number, numOfRatings: number): string {
    if (numOfRatings == 0) return 'No ratings';
    else return String(ratings / numOfRatings);
  }

  ngOnInit(): void {}
}
