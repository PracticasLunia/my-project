import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private apiUrl = environment.apiUrl + '/admin/user-verify/';
  private token = this.cookieService.get('token')

  private headers = new HttpHeaders({'Authorization':'Bearer ' + this.token});

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ){ }

  verify(id: number): Observable<void>{
    return this.http.get<void>(this.apiUrl + id, { headers: this.headers});
  }
}
