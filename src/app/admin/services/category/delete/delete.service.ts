import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Category } from '../../../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private apiUrl = environment.apiUrl + '/admin/category-delete/';

  constructor(
    private http: HttpClient,
  ){ }

  delete(id: number | null): Observable<void>{
    return this.http.delete<void>(this.apiUrl + id);
  }
}
