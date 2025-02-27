import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = 'http://127.0.0.1:8000/api/admin/courses'; 

    private http = inject(HttpClient);

    addCourse(courseData: any): Observable<any> {
        return this.http.post(this.apiUrl, courseData);
    }

    getInstructors(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/instructors`);
    }
}
