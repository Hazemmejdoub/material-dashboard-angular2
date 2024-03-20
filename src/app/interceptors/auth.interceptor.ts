import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('internalAccessToken');
    if (this.authService.isAuthenticated && accessToken) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    }
    return next.handle(request).pipe(
      catchError(error => this.handleError(error, request, next))
    );

  }
  handleError(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (error instanceof HttpErrorResponse && error.status === 401 && error.error === 'tokenExpiredError') {
      return this.handleTokenExpiredError(request, next);
    } else {
      return throwError(error);
    }
  }

  handleTokenExpiredError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.RefreshToken().pipe(
      switchMap(() => {
        const accessToken = localStorage.getItem('internalAccessToken');
        if (this.authService.isAuthenticated && accessToken) {
          request = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
        }
        return next.handle(request);
      }),
      catchError(error => {
        this.authService.logout();
        return throwError(error);
      })
    );
  }
}