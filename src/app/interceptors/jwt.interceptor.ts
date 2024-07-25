import { Injectable } from '@angular/core';
import {
HttpRequest,
HttpHandler,
HttpEvent,
HttpInterceptor,
HttpHeaders,
HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RefreshjwtService } from '../public/services/refreshjwt/refreshjwt.service';
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private refreshToken = this.cookieService.get('refreshToken');
  private token = this.cookieService.get('token');
  private isRefreshing = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private cookieService: CookieService,
    private refreshjwtService: RefreshjwtService
  ) {}

  addToken(request: HttpRequest<unknown>){
    let clone = request.clone( { headers: request.headers.append('Authorization','Bearer ' + this.token) } );
    return clone;
  }

  addRefreshToken(request: HttpRequest<unknown>){
    let clone = request.clone( { headers: request.headers.append('Authorization','Bearer ' + this.refreshToken) } );
    return clone;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true
    })

    let requestWTokens;
    if(request.url.includes('refresh-token')){
      requestWTokens = this.addRefreshToken(request);
    } else {
      requestWTokens = this.addToken(request);
    }

    return next.handle(requestWTokens).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !request.url.includes('public') && error.status === 401){
          return this.handle401Error(request, next);
        }

        throw Error(error);
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.refreshjwtService.refresh().pipe(
        switchMap((data) => {
          this.token = data.token;
          this.refreshToken = data.refreshToken;
          this.isRefreshing = false;
          this.tokenSubject.next(this.token);
          return next.handle(this.addToken(request));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          throw Error(error);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request));
        })
      );
    }
  }
}
