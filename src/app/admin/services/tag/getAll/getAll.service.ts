import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Tag } from '../../../../shared/models/tag';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private apiUrl = environment.apiUrl + '/admin/tags';

  constructor(
    private http: HttpClient,
  ){

  }

  getAll(): Observable<Tag[]>{
    return this.http.get<Tag[]>(this.apiUrl);
  }
}
