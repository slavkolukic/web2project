import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginPath = environment.apiUrl + '/auth/login';
  private registerPath = environment.apiUrl + '/auth/register';
  private registerNewAdminPath = environment.apiUrl + '/user/newAdmin';
  private getAllUsersPath = environment.apiUrl + '/user/getAllUsers';

  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data);
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserRole(): string {
    let jwt = this.getToken();
    let userRole = 'NonRegistered';
    if (jwt != null) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      userRole = decodedJwtData.role;
    }

    return userRole;
  }

  getAllUsers(data): Observable<User[]> {
    var body = {
      role: data,
    };
    return this.http
      .post(this.getAllUsersPath, body)
      .pipe(map((res) => res['allUsers']));
  }

  getUserId(): string {
    let jwt = this.getToken();
    let userRole = '';
    if (jwt != null) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      userRole = decodedJwtData.id;
    }
    return userRole;
  }
}
