import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class SearchSimilarService {
  private apiUrl = environment.apiUrl + '/shared/book-search-similar';

  constructor(
    private http: HttpClient,
  ){

  }

  searchSimilar(description: string): Observable<Book[]>{
    return this.http.post<Book[]>(this.apiUrl, {description: description});
  }
}
