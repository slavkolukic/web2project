import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  currentUserName: string = '';
  currentUserLastName: string = '';
  currentUserEmail: string = '';
  currentUserCity: string = '';
  currentUserPhoneNumber: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      newPassword: ['', Validators.required],
      ownerId: [this.authService.getUserId()],
    });

    this.getProfileInfo();
  }

  getProfileInfo() {
    this.adminService
      .getProfileInfo(this.authService.getUserId())
      .subscribe((data) => {
        console.log(data);
        this.currentUserName = data.name;
        this.currentUserLastName = data.lastName;
        this.currentUserEmail = data.email;
        this.currentUserCity = data.city;
        this.currentUserPhoneNumber = data.phoneNumber;
      });
  }

  saveProfileChanges() {
    if (this.checkIfFieldsAreEmpty()) {
      alert('Fields must not be empty!');
    } else {
      this.editProfileForm.patchValue({
        phoneNumber: String(this.editProfileForm.get('phoneNumber').value),
      });

      this.adminService
        .saveProfileChanges(this.editProfileForm.value)
        .subscribe((data) => {
          console.log(data.message);
          alert(data.message);
        });
    }
  }

  private checkIfFieldsAreEmpty() {
    if (
      this.editProfileForm.get('name').value == '' &&
      this.editProfileForm.get('lastName').value == '' &&
      this.editProfileForm.get('email').value == '' &&
      this.editProfileForm.get('phoneNumber').value == '' &&
      this.editProfileForm.get('city').value == '' &&
      this.editProfileForm.get('newPassword').value == ''
    ) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {}
}
