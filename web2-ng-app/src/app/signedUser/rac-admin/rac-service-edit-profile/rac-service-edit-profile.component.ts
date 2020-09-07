import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { RentACarCompany } from 'src/app/models/RentACarCompany';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-rac-service-edit-profile',
  templateUrl: './rac-service-edit-profile.component.html',
  styleUrls: ['./rac-service-edit-profile.component.css'],
})
export class RacServiceEditProfileComponent implements OnInit {
  editRacInfoForm: FormGroup;
  racCompany: RentACarCompany;
  currentCompanyName: string = '';
  currentCompanyAddress: string = '';
  currentCompanyDescription: string = '';
  currentCompanyPhoneNumber: string = '';
  mySubscription: any;

  constructor(
    private fb: FormBuilder,
    private racAdminService: RacAdminService,
    private authService: AuthService
  ) {
    this.editRacInfoForm = this.fb.group({
      CompanyName: ['', Validators.required],
      Adress: ['', Validators.required],
      Description: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      OwnerId: [authService.getUserId()],
    });

    this.getRacProfileInfo();
  }

  ngOnInit(): void {}

  saveProfileChanges() {
    if (this.checkIfFieldsAreEmpty()) {
      alert('Fields must not be empty!');
    } else {
      this.racAdminService
        .saveProfileChanges(this.editRacInfoForm.value)
        .subscribe((data) => {
          console.log(data);
        });
    }

    location.reload();
  }

  private checkIfFieldsAreEmpty() {
    if (
      this.editRacInfoForm.get('CompanyName').value == '' &&
      this.editRacInfoForm.get('Adress').value == '' &&
      this.editRacInfoForm.get('Description').value == '' &&
      this.editRacInfoForm.get('PhoneNumber').value == ''
    ) {
      return true;
    }
    return false;
  }

  getRacProfileInfo() {
    this.racAdminService
      .getRacProfileInfo(this.editRacInfoForm.value)
      .subscribe((data) => {
        console.log(data);
        this.currentCompanyName = data.companyName;
        this.currentCompanyAddress = data.adress;
        this.currentCompanyDescription = data.description;
        this.currentCompanyPhoneNumber = data.phoneNumber;
      });
  }
}
