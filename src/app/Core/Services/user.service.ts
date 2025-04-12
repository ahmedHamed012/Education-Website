import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../Interfaces/create-user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}`;
  private token = localStorage.getItem('learn_on_token')?.split('|')[1] ?? ''; // Ensure it's always a string
  private deviceToken = localStorage.getItem('learn_on_device_token') ?? ''; // Ensure it's always a string

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  updateUserProfile(user: FormData, id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/edit/${id}`, user, {
      headers: {
        authorization: `Bearer ${this.token}`,
        'Device-Token': this.deviceToken,
      },
    });
  }

  getStudentDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/dashboard`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        'Device-Token': this.deviceToken,
      },
    });
  }
}
