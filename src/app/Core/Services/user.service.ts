import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../Interfaces/create-user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  updateUserProfile(user: IUser, id: string): Observable<any> {
    const token = localStorage.getItem('learn_on_token')?.split('|')[1] ?? ''; // Ensure it's always a string
    const deviceToken = localStorage.getItem('learn_on_device_token') ?? ''; // Ensure it's always a string

    return this.http.post<any>(`${this.apiUrl}/student/edit/${id}`, user, {
      headers: {
        authorization: `Bearer ${token}`,
        'Device-Token': deviceToken,
      },
    });
  }
}
