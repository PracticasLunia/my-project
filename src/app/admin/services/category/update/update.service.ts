import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Category } from '../../../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = environment.apiUrl + '/admin/category-update/';

  constructor(
    private http: HttpClient,
  ){ }

  update(id: number, data: Category | any): Observable<void>{
    return this.http.post<void>(this.apiUrl + id, data);
  }
}
