import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private baseUrl = 'https://bk.learn-on.com/public/api/admin';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('learn_on_token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });
    }

    getCourses(): Observable<any> {
        return this.http.get(`${this.baseUrl}/courses`, { headers: this.getHeaders() });
    }

    getCategories(): Observable<any> {
        return this.http.get(`${this.baseUrl}/categories`, { headers: this.getHeaders() });
    }

    searchInstructors(query: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/instructors?search=${query}`, { headers: this.getHeaders() });
    }

    createCourse(courseData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/courses`, courseData, { headers: this.getHeaders() });
    }
    
    submitLectures(courseId: number, lecturesData: any): Observable<any> {
        const url = `${this.baseUrl}/courses/${courseId}/lectures`;
        return this.http.post(url, lecturesData, { headers: this.getHeaders() });
    }
    
}
