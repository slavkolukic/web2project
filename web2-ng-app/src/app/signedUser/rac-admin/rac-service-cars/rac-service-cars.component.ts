import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/models/Office';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-rac-service-cars',
  templateUrl: './rac-service-cars.component.html',
  styleUrls: ['./rac-service-cars.component.css'],
})
export class RacServiceCarsComponent implements OnInit {
  addCarForm: FormGroup;
  editCarForm: FormGroup;
  allOffices: Office[];
  allCars: Car[];
  selectedOffice: string = 'Select Office';
  selectedOfficeId: string = '';
  selectedCarType: string = 'Select car type';
  selectedEditCarType: string = '';
  mode: string = 'add';
  editCarId: string = '';
  editCarModel: string = '';
  editCarBrand: string = '';
  editCarYear: string = '';
  editCarTypeOfCar: string = '';
  editCarNumberOfSeats: string = '';
  editCarPricePerDay: string = '';

  constructor(
    private fb: FormBuilder,
    private racAdminService: RacAdminService,
    private authService: AuthService
  ) {
    this.addCarForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', Validators.required],
      typeOfCar: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      pricePerDay: ['', Validators.required],
      officeId: [''],
    });

    this.editCarForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', Validators.required],
      typeOfCar: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      pricePerDay: ['', Validators.required],
      id: ['', Validators.required],
    });

    this.getAllOffices();
    this.getAllCars();
  }

  ngOnInit(): void {}

  saveSelectedOffice(
    officeId: string,
    officeCity: string,
    officeAddress: string
  ) {
    this.selectedOfficeId = officeId;
    this.selectedOffice = officeCity + ' ' + officeAddress;
  }

  saveSelectedCarType(carType: string) {
    this.selectedCarType = carType;

    this.addCarForm.patchValue({
      typeOfCar: carType,
    });
  }

  saveEditedCarType(carType: string) {
    this.selectedEditCarType = carType;

    this.editCarForm.patchValue({
      typeOfCar: carType,
    });
  }

  addNewCar() {
    if (this.validateFields()) {
      alert('Fields must not be empty!');
    } else if (this.selectedOfficeId == '') {
      alert('Please select office!');
    } else {
      this.addCarForm.patchValue({
        officeId: this.selectedOfficeId,
      });

      console.log(this.addCarForm.value);

      this.racAdminService
        .addNewCar(this.addCarForm.value)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  validateFields(): boolean {
    if (
      this.addCarForm.get('model').value == '' ||
      this.addCarForm.get('brand').value == '' ||
      this.addCarForm.get('year').value == '' ||
      this.addCarForm.get('typeOfCar').value == '' ||
      this.addCarForm.get('numberOfSeats').value == '' ||
      this.addCarForm.get('pricePerDay').value == ''
    ) {
      return true;
    }
    return false;
  }

  getAllCars() {
    this.racAdminService
      .getUserCars(this.authService.getUserId())
      .subscribe((data) => {
        this.allCars = data;
        console.log(this.allCars);
      });
  }

  getAllOffices() {
    this.racAdminService
      .getUserOffices(this.authService.getUserId())
      .subscribe((data) => {
        this.allOffices = data;
        console.log(this.allOffices);
      });
  }

  editCarButton(event) {
    this.mode = 'edit';

    this.racAdminService.getCarInfo(event.target.id).subscribe((data) => {
      this.editCarId = data.carInfo.id;
      this.editCarModel = data.carInfo.model;
      this.editCarBrand = data.carInfo.brand;
      this.editCarYear = data.carInfo.year;
      this.editCarTypeOfCar = data.carInfo.typeOfCar;
      this.editCarNumberOfSeats = data.carInfo.numberOfSeats;
      this.editCarPricePerDay = data.carInfo.pricePerDay;
      console.log(data);
    });
  }

  editCar() {
    this.editCarForm.patchValue({
      id: this.editCarId,
    });

    if (this.editCarForm.get('year').value == '') {
      this.editCarForm.patchValue({
        year: this.editCarYear,
      });
    }

    if (this.editCarForm.get('numberOfSeats').value == '') {
      this.editCarForm.patchValue({
        numberOfSeats: this.editCarNumberOfSeats,
      });
    }

    if (this.editCarForm.get('pricePerDay').value == '') {
      this.editCarForm.patchValue({
        pricePerDay: this.editCarPricePerDay,
      });
    }

    this.racAdminService
      .editCarInfo(this.editCarForm.value)
      .subscribe((data) => {
        console.log(data);
      });

    location.reload();
  }

  deleteCarButton(event) {
    this.racAdminService.deleteCar(event.target.id).subscribe((data) => {
      console.log(data);
    });

    location.reload();
  }
}
