import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifiedService {
  private apiUrl = environment.apiUrl + '/shared/is-verified';

  constructor(
    private http: HttpClient,
  ){

  }

  isVerified(): Observable<void>{
    return this.http.get<void>(this.apiUrl);
  }
}
