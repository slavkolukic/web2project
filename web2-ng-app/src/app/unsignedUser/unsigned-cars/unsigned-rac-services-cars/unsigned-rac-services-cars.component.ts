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
    console.log(this.searchCarsForm.value);
    this.signedService
      .getFilteredCars(this.searchCarsForm.value)
      .subscribe((data) => {
        this.allCars = data;
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
