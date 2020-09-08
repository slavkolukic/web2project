import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/models/Office';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rac-service-cars',
  templateUrl: './rac-service-cars.component.html',
  styleUrls: ['./rac-service-cars.component.css'],
})
export class RacServiceCarsComponent implements OnInit {
  addCarForm: FormGroup;
  allOffices: Office[];
  selectedOffice: string = 'Select Office';
  selectedOfficeId: string = '';

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

    this.racAdminService
      .getUserOffices(this.authService.getUserId())
      .subscribe((data) => {
        this.allOffices = data;
        console.log(this.allOffices);
      });
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
}
