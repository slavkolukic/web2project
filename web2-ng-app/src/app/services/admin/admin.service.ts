import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private newRacAdminPath = environment.apiUrl + '/user/assignRacCompany';
  constructor(private http: HttpClient) {}

  registerNewAdmin(data): Observable<any> {
    return this.http.post(this.newRacAdminPath, data);
  }
}
