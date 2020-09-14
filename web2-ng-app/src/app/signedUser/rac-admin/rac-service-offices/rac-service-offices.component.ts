import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Office } from 'src/app/models/Office';
import { stringify } from 'querystring';

@Component({
  selector: 'app-rac-service-offices',
  templateUrl: './rac-service-offices.component.html',
  styleUrls: ['./rac-service-offices.component.css'],
})
export class RacServiceOfficesComponent implements OnInit {
  newOfficeForm: FormGroup;
  editOfficeForm: FormGroup;
  allOffices: Office[];
  mode: string = 'add';
  editOfficeId: string = '';
  editOfficeAddress: string = '';
  editOfficeCity: string = '';

  constructor(
    private fb: FormBuilder,
    private racAdminService: RacAdminService,
    private authService: AuthService
  ) {
    this.newOfficeForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      ownerId: [authService.getUserId()],
    });

    this.editOfficeForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      id: [''],
    });

    this.racAdminService
      .getUserOffices(this.authService.getUserId())
      .subscribe((data) => {
        this.allOffices = data;
        console.log(this.allOffices);
      });
  }

  ngOnInit(): void {}

  registerNewOffice() {
    if (
      this.newOfficeForm.get('address').value == '' ||
      this.newOfficeForm.get('city').value == ''
    ) {
      alert('Field must not be empty!');
    } else {
      this.racAdminService
        .registerNewOffice(this.newOfficeForm.value)
        .subscribe((data) => {
          console.log(data);
          alert(data.message);
        });
    }
  }

  deleteOffice(event) {
    this.racAdminService.deleteOffice(event.target.id).subscribe((data) => {
      console.log(data);
      alert(data.message);
    });
  }

  editOfficeButton(event) {
    this.mode = 'edit';

    this.racAdminService.getOfficeInfo(event.target.id).subscribe((data) => {
      this.editOfficeId = data.officeInfo.id;
      this.editOfficeAddress = data.officeInfo.address;
      this.editOfficeCity = data.officeInfo.city;
      console.log(this.editOfficeId);
    });
  }

  editOffice() {
    this.editOfficeForm.patchValue({
      id: this.editOfficeId,
    });
    this.racAdminService
      .editOfficeInfo(this.editOfficeForm.value)
      .subscribe((data) => {
        alert(data.message);
      });
  }
}
