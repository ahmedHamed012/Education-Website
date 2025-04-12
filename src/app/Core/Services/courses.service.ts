import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getAllCorses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses`);
  }

  getMyCourses(): Observable<any> {
    const token = localStorage.getItem('learn_on_token')?.split('|')[1] ?? ''; // Ensure it's always a string
    const deviceToken = localStorage.getItem('learn_on_device_token') ?? ''; // Ensure it's always a string
    return this.http.get<any>(`${this.apiUrl}/student/mycourses`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Device-Token': deviceToken,
      },
    });
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}`);
  }

  getRelatedCourses(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}/related`);
  }

  getPopularCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PopularCourses`);
  }

  submitFeedback(
    rating: number,
    comment: string,
    courseId: string,
    studentId: string
  ): Observable<any> {
    const token = localStorage.getItem('learn_on_token')?.split('|')[1] ?? ''; // Ensure it's always a string
    const deviceToken = localStorage.getItem('learn_on_device_token') ?? ''; // Ensure it's always a string

    return this.http.post<any>(
      `${this.apiUrl}/student/courses/${courseId}/feedback`,
      { rating, comment, student_id: studentId },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Device-Token': deviceToken,
        },
      }
    );
  }
}
