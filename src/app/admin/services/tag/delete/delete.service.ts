import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Tag } from '../../../../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private apiUrl = environment.apiUrl + '/admin/tag-delete/';

  constructor(
    private http: HttpClient,
  ){ }

  delete(id: number): Observable<Tag>{
    return this.http.delete<Tag>(this.apiUrl + id);
  }
}
