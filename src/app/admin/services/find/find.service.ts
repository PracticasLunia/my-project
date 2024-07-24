import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FindService {
  private apiUrl = environment.apiUrl + '/admin/user';
  private token = this.cookieService.get('token')

  private headers = new HttpHeaders({'Authorization':'Bearer ' + this.token});

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ){

  }

  find(email: string, password: string): Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl, {email: email, password: password}, { headers: this.headers});
  }
}
