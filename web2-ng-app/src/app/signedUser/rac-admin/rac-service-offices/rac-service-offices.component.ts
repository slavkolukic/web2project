import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Office } from 'src/app/models/Office';

@Component({
  selector: 'app-rac-service-offices',
  templateUrl: './rac-service-offices.component.html',
  styleUrls: ['./rac-service-offices.component.css'],
})
export class RacServiceOfficesComponent implements OnInit {
  newOfficeForm: FormGroup;
  allOffices: Office[];
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

    this.racAdminService.getAllOffices().subscribe((data) => {
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
        });
    }
  }
}
