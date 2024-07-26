import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private apiUrl = environment.apiUrl + '/admin/user/';

  constructor(
    private http: HttpClient,
  ){ }

  get(id: number): Observable<User>{
    return this.http.get<User>(this.apiUrl + id);
  }
}
