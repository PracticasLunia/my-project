import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Category } from '../../../../shared/models/category';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private apiUrl = environment.apiUrl + '/admin/categories';

  constructor(
    private http: HttpClient,
  ){

  }

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }
}
