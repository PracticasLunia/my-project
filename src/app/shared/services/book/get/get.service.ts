import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Book } from '../../../models/book';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private apiUrl = environment.apiUrl + '/admin/book/';

  constructor(
    private http: HttpClient,
  ){ }

  get(isbn: string): Observable<Book>{
    return this.http.get<Book>(this.apiUrl + isbn);
  }
}
