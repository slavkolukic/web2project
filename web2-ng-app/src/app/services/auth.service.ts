import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginPath = environment.apiUrl + '/user/login';
  private registerPath = environment.apiUrl + '/user/register';
  private registerNewAdminPath = environment.apiUrl + '/user/newAdmin';

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

    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    let userRole = decodedJwtData.role;

    return userRole;
  }

  registerNewAdmin(data): Observable<any> {
    return this.http.post(this.registerNewAdminPath, data);
  }
}
