import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  private readonly apiUrl = `${environment.apiUrl}`;
  public lectureDataSnippet: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getLectureData(courseId: string, lectureId: string): Observable<any> {
    const token = localStorage.getItem('learn_on_token')?.split('|')[1] ?? ''; // Ensure it's always a string
    const deviceToken = localStorage.getItem('learn_on_device_token') ?? ''; // Ensure it's always a string

    return this.http.get<any>(
      `${environment.apiUrl}/student/mycourses/${courseId}/lectures/${lectureId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Device-Token': deviceToken,
        },
      }
    );
  }
}
