import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../Interfaces/create-user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = `${environment.apiUrl}`;
  public userDataSnippet: BehaviorSubject<any> = new BehaviorSubject<any>(null);
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
  register(userData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
  updateUserPassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/update-password`,
      {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem('learn_on_token')?.split('|')[1]
          }`,
          'Device-Token': localStorage.getItem('learn_on_device_token') ?? '',
        },
      }
    );
  }
  getLoggedInUserData(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Device-Token': localStorage.getItem('learn_on_device_token') ?? '',
      },
    });
  }
  getLoggedInAdminData(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Device-Token': localStorage.getItem('learn_on_device_token') ?? '',
      },
    });
  }
  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, {
      email,
    });
  }
  resetPassword(resetPassword: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, {
      email: resetPassword.email,
      token: resetPassword.token,
      password: resetPassword.password,
      password_confirmation: resetPassword.password_confirmation,
    });
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
