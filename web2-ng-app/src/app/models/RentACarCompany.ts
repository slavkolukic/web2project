export class RentACarCompany {
  Id: number;
  Description: string;
  CompanyName: string;
  Adress: string;
  PhoneNumber: string;

  constructor(
    Id: number,
    Description: string,
    CompanyName: string,
    Adress: string,
    PhoneNumber: string
  ) {
    this.Id = Id;
    this.Description = Description;
    this.CompanyName = CompanyName;
    this.Adress = Adress;
    this.PhoneNumber = PhoneNumber;
  }
}
