import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-administrator',
  templateUrl: './register-administrator.component.html',
  styleUrls: ['./register-administrator.component.css'],
})
export class RegisterAdministratorComponent implements OnInit {
  newAdminForm: FormGroup;
  allUsers: User[];
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private authService: AuthService
  ) {
    this.newAdminForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.adminService
      .getAllUsers(this.authService.getUserRole())
      .subscribe((data) => {
        this.allUsers = data;
      });
  }

  ngOnInit(): void {}

  registerNewAdmin() {
    if (this.newAdminForm.get('email').value == '') {
      alert('Field must not be empty!');
    } else {
      this.adminService
        .registerNewAdmin(this.newAdminForm.value)
        .subscribe((data) => {
          alert(data.message);
        });
    }
  }
}
