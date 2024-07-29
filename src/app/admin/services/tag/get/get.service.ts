import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Tag } from '../../../../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private apiUrl = environment.apiUrl + '/admin/tag/';

  constructor(
    private http: HttpClient,
  ){ }

  get(id: number): Observable<Tag>{
    return this.http.get<Tag>(this.apiUrl + id);
  }
}
