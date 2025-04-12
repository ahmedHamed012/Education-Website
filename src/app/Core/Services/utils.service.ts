import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IContactUs } from '../Interfaces/contact-us.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly apiUrl = `${environment.apiUrl}`;
  constructor(private readonly http: HttpClient) {}

  public fixAssetUrl(url: string): string {
    const normalUrl = url.replace(/\\/g, '');
    return normalUrl;
  }

  public sendContactUsMessage(contactUsBody: IContactUs): Observable<any> {
    return this.http.post<IContactUs>(
      `${this.apiUrl}/contactus`,
      contactUsBody
    );
  }
}
