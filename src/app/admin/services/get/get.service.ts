import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private apiUrl = environment.apiUrl + '/admin/user/';
  private token = this.cookieService.get('token')

  private headers = new HttpHeaders({'Authorization':'Bearer ' + this.token});

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ){ }

  get(id: number): Observable<User>{
    return this.http.get<User>(this.apiUrl + id, { headers: this.headers});
  }
}
