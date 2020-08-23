import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public name = '';
  public lastName = '';
  public phoneNumber = '';
  public city = '';
  public email = '';
  public password = '';
  public repeatedPassword = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.password !== this.repeatedPassword) {
      alert('The passwords doesnt match please try again');
    } else {
      let newUser = new User(
        this.name,
        this.lastName,
        this.email,
        this.phoneNumber,
        this.city,
        this.password
      );
    }
  }
}
