import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Category } from '../../../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private apiUrl = environment.apiUrl + '/admin/category/';

  constructor(
    private http: HttpClient,
  ){ }

  get(isbn: string): Observable<Category>{
    return this.http.get<Category>(this.apiUrl + isbn);
  }
}
