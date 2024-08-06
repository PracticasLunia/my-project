import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  private apiUrl = environment.apiUrl + '/public/update-password/';

  constructor(private http: HttpClient){}

  updatePassword(token: string, password: string): Observable<void>{
    return this.http.post<void>(this.apiUrl + token, {password: password}, {withCredentials: true});
  }
}
