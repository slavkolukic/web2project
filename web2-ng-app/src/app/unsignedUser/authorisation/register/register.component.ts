import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    if (
      this.registerForm.get('name').value == '' ||
      this.registerForm.get('lastName').value == '' ||
      this.registerForm.get('city').value == '' ||
      this.registerForm.get('phoneNumber').value == '' ||
      this.registerForm.get('email').value == '' ||
      this.registerForm.get('password').value == '' ||
      this.registerForm.get('repeatedPassword').value == ''
    ) {
      alert('Fields must not be empty!');
    } else if (
      this.registerForm.get('password').value !==
      this.registerForm.get('repeatedPassword').value
    ) {
      alert('Passwords must be same!');
    }

    this.authService.register(this.registerForm.value).subscribe((data) => {
      console.log(data.message);
      alert(data.message);
    });
  }
}
