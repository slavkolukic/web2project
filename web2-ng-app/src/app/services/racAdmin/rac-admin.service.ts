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
  private getUserOfficesPath = environment.apiUrl + '/rac/getUserOffices';
  private deleteOfficePath = environment.apiUrl + '/rac/deleteOffice';
  private getOfficeInfoPath = environment.apiUrl + '/rac/getOfficeInfo';
  private editOfficeInfoPath = environment.apiUrl + '/rac/editOfficeInfo';
  private addNewCarPath = environment.apiUrl + '/rac/addNewCar';
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

  getUserOffices(ownerId: string): Observable<Office[]> {
    var data = {
      OwnerId: ownerId,
    };

    return this.http
      .post(this.getUserOfficesPath, data)
      .pipe(map((res) => res['allOffices']));
  }

  deleteOffice(id: string): Observable<any> {
    var data = {
      Id: id,
    };

    return this.http.post(this.deleteOfficePath, data);
  }

  getOfficeInfo(id: string): Observable<any> {
    var data = {
      Id: id,
    };

    return this.http.post(this.getOfficeInfoPath, data);
  }

  editOfficeInfo(data): Observable<any> {
    return this.http.post(this.editOfficeInfoPath, data);
  }

  addNewCar(data): Observable<any> {
    return this.http.post(this.addNewCarPath, data);
  }
}
