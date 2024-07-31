import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Book } from '../../../../shared/models/book';

@Injectable({
  providedIn: 'root'
})
export class CoverService {
  private apiUrl = environment.apiUrl + '/admin/book-cover/';

  constructor(
    private http: HttpClient,
  ){ }

  cover(isbn: string): Observable<Book>{
    return this.http.get<Book>(this.apiUrl + isbn);
  }
}
