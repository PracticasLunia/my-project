import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/public/login';

  constructor(private http: HttpClient){}

  login(email: string, password: string): Observable<{token: string, refreshToken: string}>{
    return this.http.post<{token: string, refreshToken: string}>(this.apiUrl, {email: email, password: password}, {withCredentials: true});
  }
}
