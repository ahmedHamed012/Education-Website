import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getAllInstructors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/landingPage/instructors`);
  }

  getInstructorById(instructorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/instructors/${instructorId}`);
  }
}
