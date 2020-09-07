import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private newRacAdminPath = environment.apiUrl + '/user/assignRacCompany';
  private registerNewAdminPath = environment.apiUrl + '/user/newAdmin';
  private getAllUsersPath = environment.apiUrl + '/user/getAllUsers';
  constructor(private http: HttpClient) {}

  registerNewRacAdmin(data): Observable<any> {
    return this.http.post(this.newRacAdminPath, data);
  }

  registerNewAdmin(data): Observable<any> {
    return this.http.post(this.registerNewAdminPath, data);
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get(this.getAllUsersPath)
      .pipe(map((res) => res['allUsers']));
  }
}
