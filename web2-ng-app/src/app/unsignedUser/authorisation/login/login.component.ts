import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../../../common/globalVariables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    GlobalVariables.loggedUser = 'admin';
    this.authService.login(this.loginForm.value).subscribe((data) => {
      this.authService.saveToken(data['token']);
      this.router.navigate(['signed-home']);
    });

    this.authService.getUserRole();
  }
}
