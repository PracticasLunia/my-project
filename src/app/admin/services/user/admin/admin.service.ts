import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl + '/admin/is-admin';

  constructor(
    private http: HttpClient,
  ){

  }

  isAdmin(): Observable<void>{
    return this.http.get<void>(this.apiUrl);
  }
}
