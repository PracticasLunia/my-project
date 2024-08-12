import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl + '/public/register';

  constructor(private http: HttpClient){}

  register(user: User): Observable<{token: string, refreshToken: string}>{
    return this.http.post<{token: string, refreshToken: string}>(this.apiUrl, user, {withCredentials: true});
  }
}
