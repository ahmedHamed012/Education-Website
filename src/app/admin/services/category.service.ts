import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://127.0.0.1:8000/api/admin/categories';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        const token = localStorage.getItem('token'); 
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.get<any>(this.apiUrl);
    }
}
