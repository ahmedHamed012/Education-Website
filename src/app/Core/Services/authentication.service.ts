import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../Interfaces/create-user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}
  private googleAuthUrl = 'http://localhost:8000/api/auth/google';
  // private googleAuthUrl = 'http://localhost:5000/auth/google';

  // Redirect user to Google authentication
  loginWithGoogle() {
    window.open(
      this.googleAuthUrl,
      'GoogleAuth',
      'width=500,height=600,left=100,top=100'
    );
  }

  // Handle response from backend
  handleGoogleCallback(response: any) {
    localStorage.setItem('googleUser', JSON.stringify(response));

    // Redirect user to sign-up form with Google data prefilled
    this.router.navigate(['/sign-up']);
  }

  // Get user details from storage
  getGoogleUser() {
    return JSON.parse(localStorage.getItem('googleUser') || '{}');
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }
  register(userData: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { ...userData });
  }
  getLoggedInUserData(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, {
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
  logout(): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('learn_on_token')?.split('|')[1]
          }`,
        },
      }
    );
  }
}
