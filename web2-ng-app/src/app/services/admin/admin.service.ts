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
  static ngInjectableDef = undefined; //nece da radi bez ovoga
  private newRacAdminPath = environment.apiUrl + '/admin/assignRacCompany';
  private registerNewAdminPath = environment.apiUrl + '/admin/newAdmin';
  private getAllUsersPath = environment.apiUrl + '/user/getAllUsers';
  private getUserProfileInfoPath =
    environment.apiUrl + '/user/getUserProfileInfo';
  private saveUserProfileChangesPath =
    environment.apiUrl + '/user/saveUserProfileChanges';
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

  getProfileInfo(data) {
    var body = {
      ownerId: data,
    };
    return this.http
      .post(this.getUserProfileInfoPath, body)
      .pipe(map((res) => res['user']));
  }

  saveProfileChanges(data): any {
    return this.http.post(this.saveUserProfileChangesPath, data);
  }
}
