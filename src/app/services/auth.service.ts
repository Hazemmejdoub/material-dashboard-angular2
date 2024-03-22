import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './auth.types';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = 'http://localhost:3200/auth';
  private readonly internalAccessToken = 'internalAccessToken';
  private readonly internalRefreshToken = 'internalRefreshToken';

  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;

  constructor(private http: HttpClient) {
    this.loadTokens();
  }

  loadTokens() {
    
  }


  saveTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem(this.internalAccessToken, accessToken);
    localStorage.setItem(this.internalRefreshToken, refreshToken);
    this.isAuthenticated = true;
  }


  login(credentials: { email: string, password: string }): Observable<{ accessToken: string, refreshToken: string }> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(`${this.authUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          this.saveTokens(response.accessToken, response.refreshToken);
        })
      )
  }

  signup(userDetails: User): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, userDetails);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.authUrl}/logout`, {}).pipe(
      catchError((error) => {
        console.error('Erreur lors de la déconnexion :', error);
        return throwError(error);
      }),
      tap(() => {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem(this.internalAccessToken);
        localStorage.removeItem(this.internalRefreshToken);
        this.isAuthenticated = false;
      })
    );
  }


  refreshTokens(): Observable<{ accessToken: string, refreshToken: string }> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(`${this.authUrl}/refresh-token`, { refreshToken: this.refreshToken }).pipe(
      catchError((error) => {
        console.error('Erreur lors du rafraîchissement du token :', error);
        return throwError(error);
      }),
      tap((response) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      })
    );
  }

}
