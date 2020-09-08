import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { RentACarCompany } from 'src/app/models/RentACarCompany';
import { Office } from '../../models/Office';

@Injectable({
  providedIn: 'root',
})
export class RacAdminService {
  static ngInjectableDef = undefined; //nece da radi bez ovoga
  private saveRacProfileChangesPath =
    environment.apiUrl + '/rac/saveRacProfileChanges';
  private getRacProfileInfoPath = environment.apiUrl + '/rac/getRacProfileInfo';
  private registerNewOfficePath = environment.apiUrl + '/rac/registerNewOffice';
  private getAllOfficesPath = environment.apiUrl + '/rac/getAllOffices';
  constructor(private http: HttpClient) {}

  saveProfileChanges(data): Observable<any> {
    return this.http.post(this.saveRacProfileChangesPath, data);
  }

  getRacProfileInfo(data) {
    return this.http
      .post(this.getRacProfileInfoPath, data)
      .pipe(map((res) => res['racCompany']));
  }

  registerNewOffice(data): Observable<any> {
    return this.http.post(this.registerNewOfficePath, data);
  }

  getAllOffices(): Observable<Office[]> {
    return this.http
      .get(this.getAllOfficesPath)
      .pipe(map((res) => res['allOffices']));
  }
}
