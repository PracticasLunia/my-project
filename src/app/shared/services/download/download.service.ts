import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private apiUrl = environment.apiUrl + '/shared/book-download/';

  constructor(
    private http: HttpClient,
  ){

  }

  download(isbn: string): Observable<any>{
    return this.http.get(this.apiUrl + isbn, {observe: 'response', responseType: 'blob'});
  }
}
