import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RacAdminService {
  static ngInjectableDef = undefined; //nece da radi bez ovoga
  private saveRacProfileChangesPath =
    environment.apiUrl + '/rac/saveRacProfileChanges';
  constructor(private http: HttpClient) {}

  saveProfileChanges(data): Observable<any> {
    return this.http.post(this.saveRacProfileChangesPath, data);
  }
}
