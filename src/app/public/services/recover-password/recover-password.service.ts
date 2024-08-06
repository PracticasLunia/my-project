import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  private apiUrl = environment.apiUrl + '/public/recover-password';

  constructor(private http: HttpClient){}

  recoverPassword(email: string): Observable<void>{
    return this.http.post<void>(this.apiUrl, {email: email}, {withCredentials: true});
  }
}
