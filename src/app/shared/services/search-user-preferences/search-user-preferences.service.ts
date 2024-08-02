import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class SearchUserPreferencesService {
  private apiUrl = environment.apiUrl + '/shared/book-search-preferences';

  constructor(
    private http: HttpClient,
  ){}

  searchUserPreferences(): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiUrl);
  }
}
