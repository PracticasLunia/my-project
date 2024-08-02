import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailVerifyService {
  private apiUrl = environment.apiUrl + '/public/mail-verify/';

  constructor(
    private http: HttpClient,
  ){

  }

  verify(token: string): Observable<void>{
    return this.http.get<void>(this.apiUrl+token);
  }
}
