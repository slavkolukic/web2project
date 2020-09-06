import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register-administrator',
  templateUrl: './register-administrator.component.html',
  styleUrls: ['./register-administrator.component.css'],
})
export class RegisterAdministratorComponent implements OnInit {
  newAdminForm: FormGroup;
  allUsers: User[];
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.newAdminForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.authService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
    });
  }

  ngOnInit(): void {}

  registerNewAdmin() {
    if (this.newAdminForm.get('email').value == '') {
      alert('Field must not be empty!');
    } else {
      this.authService
        .registerNewAdmin(this.newAdminForm.value)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
