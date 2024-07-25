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

  constructor(
    private http: HttpClient,
  ){

  }

  find(email: string, password: string): Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl, {email: email, password: password});
  }
}
