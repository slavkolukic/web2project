export class User {
  id: string;
  name: string;
  lastname: string;
  email: string; //jedinstven....
  phoneNumber: string;
  city: string;
  password: string;

  constructor(
    name: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    city: string,
    password: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.password = password;
  }
}
