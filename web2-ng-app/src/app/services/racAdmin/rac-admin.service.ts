import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { RentACarCompany } from 'src/app/models/RentACarCompany';
import { Office } from '../../models/Office';
import { Car } from 'src/app/models/Car';

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
  private getUserCarsPath = environment.apiUrl + '/rac/getAllUserCars';
  private getCarInfoPath = environment.apiUrl + '/rac/getCarInfo';
  private editCarInfoPath = environment.apiUrl + '/rac/editCarInfo';
  private deleteCarPath = environment.apiUrl + '/rac/deleteCar';
  private getServiceRatingPath = environment.apiUrl + '/rac/getServiceRating';
  private getAllCarEarningsPath = environment.apiUrl + '/rac/getAllCarEarnings';

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
    const data = {
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

  getUserCars(ownerId: string): Observable<Car[]> {
    var data = {
      OwnerId: ownerId,
    };

    return this.http
      .post(this.getUserCarsPath, data)
      .pipe(map((res) => res['allCars']));
  }

  getCarInfo(id: string): Observable<any> {
    var data = {
      Id: id,
    };

    return this.http.post(this.getCarInfoPath, data);
  }

  editCarInfo(data): Observable<any> {
    return this.http.post(this.editCarInfoPath, data);
  }

  deleteCar(id: string): Observable<any> {
    var data = {
      Id: id,
    };

    return this.http.post(this.deleteCarPath, data);
  }

  getServiceRating(ownerId: string): Observable<any> {
    var data = {
      OwnerId: ownerId,
    };

    return this.http.post(this.getServiceRatingPath, data);
  }

  getAllCarsEarnings(ownerId: string): Observable<any> {
    var data = {
      OwnerId: ownerId,
    };

    return this.http.post(this.getAllCarEarningsPath, data);
  }
}
