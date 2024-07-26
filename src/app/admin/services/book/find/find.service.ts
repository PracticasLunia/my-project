import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Book } from '../../../../shared/models/book';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FindService {
  private apiUrl = environment.apiUrl + '/admin/book';

  constructor(
    private http: HttpClient,
  ){

  }

  find(title: string, author: string): Observable<Book[]>{
    return this.http.post<Book[]>(this.apiUrl, {title: title, author: author});
  }
}
