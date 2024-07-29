import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Tag } from '../../../../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private apiUrl = environment.apiUrl + '/admin/tag-create/';

  constructor(
    private http: HttpClient,
  ){ }

  create(data: Tag | any): Observable<void>{
    return this.http.post<void>(this.apiUrl, data);
  }
}
