import { createAotUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car';
import { SignedUserService } from 'src/app/services/signed/signed-user.service';

@Component({
  selector: 'app-unsigned-rac-services-cars',
  templateUrl: './unsigned-rac-services-cars.component.html',
  styleUrls: ['./unsigned-rac-services-cars.component.css'],
})
export class UnsignedRacServicesCarsComponent implements OnInit {
  allCars: Car[];
  searchCarsForm: FormGroup;
  selectedCarType: string = 'Select car type';
  constructor(
    private signedService: SignedUserService,
    private fb: FormBuilder
  ) {
    this.searchCarsForm = this.fb.group({
      firstDayOfReservaton: ['', Validators.required],
      lastDayOfReservaton: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
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
    var from = this.searchCarsForm.get('firstDayOfReservaton').value;
    var to = this.searchCarsForm.get('lastDayOfReservaton').value;

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

  ngOnInit(): void {}
}
