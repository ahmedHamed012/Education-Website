import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private readonly apiUrl = `${environment.apiUrl}`;
  public instructorDataSnippet: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getAllInstructors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/instructors`);
  }

  getInstructorById(instructorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/instructors/${instructorId}`);
  }
}
