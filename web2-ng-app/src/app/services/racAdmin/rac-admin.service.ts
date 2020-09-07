import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { RentACarCompany } from 'src/app/models/RentACarCompany';

@Injectable({
  providedIn: 'root',
})
export class RacAdminService {
  static ngInjectableDef = undefined; //nece da radi bez ovoga
  private saveRacProfileChangesPath =
    environment.apiUrl + '/rac/saveRacProfileChanges';
  private getRacProfileInfoPath = environment.apiUrl + '/rac/getRacProfileInfo';
  constructor(private http: HttpClient) {}

  saveProfileChanges(data): Observable<any> {
    return this.http.post(this.saveRacProfileChangesPath, data);
  }

  getRacProfileInfo(data): Observable<any> {
    return this.http.post(this.getRacProfileInfoPath, data);
  }
}
