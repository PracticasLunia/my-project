import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshjwtService {
  private apiUrl = environment.apiUrl + '/public/refresh-token';

  constructor(
    private http: HttpClient,
  ){

  }

  refresh(): Observable<{token: string, refreshToken: string}>{
    return this.http.get<{token: string, refreshToken: string}>(this.apiUrl);
  }
}
