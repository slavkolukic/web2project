import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'src/app/models/Car';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignedUserService {
  static ngInjectableDef = undefined; //nece da radi bez ovoga
  private getAllCarsPath = environment.apiUrl + '/user/getAllCars';
  private getFilteredCarsPath = environment.apiUrl + '/user/getFilteredCars';
  private makeCarReservationPath =
    environment.apiUrl + '/user/makeCarReservation';
  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http
      .get(this.getAllCarsPath)
      .pipe(map((res) => res['retCars']));
  }

  getFilteredCars(data): Observable<Car[]> {
    return this.http
      .post(this.getFilteredCarsPath, data)
      .pipe(map((res) => res['retCars']));
  }

  makeCarReservation(data): any {
    return this.http.post(this.makeCarReservationPath, data);
  }
}
