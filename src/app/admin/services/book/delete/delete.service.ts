import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Book } from '../../../../shared/models/book';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private apiUrl = environment.apiUrl + '/admin/book-delete/';

  constructor(
    private http: HttpClient,
  ){ }

  delete(isbn: string): Observable<Book>{
    return this.http.delete<Book>(this.apiUrl + isbn);
  }
}
