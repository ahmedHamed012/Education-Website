import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = `${environment.apiUrl}`;
  clientheaders = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  constructor(private readonly http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/login?email=${email}&password=${password}`,
      {},
      {
        headers: this.clientheaders,
        withCredentials: true,
      }
    );
  }
  register(userData: any): Observable<any> {
    const {
      name,
      phone,
      email,
      password,
      password_confirmation,
      gender,
      Country,
      age,
    } = userData;
    return this.http.post<any>(
      `${this.apiUrl}/register?name=${name}&email=${email}&phone=${phone}&gender=${gender}&Country=${Country}&password=${password}&password_confirmation=${password_confirmation}&age=${age}`,
      {}
    );
  }
  getLoggedInUserData(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/forgot-password?email=${email}`,
      {}
    );
  }
  resetPassword(resetPassword: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/reset-password?email=${resetPassword.email}&token=${resetPassword.token}&password=${resetPassword.password}&password_confirmation=${resetPassword.password_confirmation}`,
      {}
    );
  }
}
