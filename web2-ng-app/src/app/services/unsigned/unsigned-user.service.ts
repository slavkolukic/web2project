import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'src/app/models/Car';
import { Office } from 'src/app/models/Office';
import { RentACarCompany } from 'src/app/models/RentACarCompany';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnsignedUserService {
  static ngInjectableDef = undefined; //nece da radi bez ovoga
  private getAllCarCompaniesPath =
    environment.apiUrl + '/user/getAllCarCompanies';
  private getRacCompanyInfoPath =
    environment.apiUrl + '/user/getRacCompanyInfo';
  private getRacCompanyOfficesPath =
    environment.apiUrl + '/user/getRacCompanyOffices';
  private getRacCompanyCarsPath =
    environment.apiUrl + '/user/getRacCompanyCars';

  constructor(private http: HttpClient) {}

  getCarCompanies(): Observable<RentACarCompany[]> {
    return this.http
      .get(this.getAllCarCompaniesPath)
      .pipe(map((res) => res['allCarCompanies']));
  }

  getRacCompanyInfo(id: string): Observable<any> {
    var data = {
      Id: id,
    };
    return this.http.post(this.getRacCompanyInfoPath, data);
  }

  getRacCompanyOffices(id: string): Observable<Office[]> {
    var data = {
      Id: id,
    };
    return this.http
      .post(this.getRacCompanyOfficesPath, data)
      .pipe(map((res) => res['retOffices']));
  }

  getRacCompanyCars(id: string): Observable<Car[]> {
    var data = {
      Id: id,
    };
    return this.http
      .post(this.getRacCompanyCarsPath, data)
      .pipe(map((res) => res['retCars']));
  }
}
