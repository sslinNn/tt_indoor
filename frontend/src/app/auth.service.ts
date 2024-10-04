import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

export interface AuthResponse {
  auth_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  register(
    email: string,
    password: string,
    re_password: string,
    username: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, {
      email,
      password,
      re_password,
      username,
    });
  }

  login(password: string, username: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/token/login/`, {
        password,
        username,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.auth_token);
        }),
        switchMap((response) => {
          // Получаем данные пользователя после успешного входа
          return this.me().pipe(
            tap((userData) => {
              localStorage.setItem('user', JSON.stringify(userData));
            }),
            catchError((error) => {
              console.error('Failed to fetch user data:', error);
              return throwError(error);
            })
          );
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/logout/`, {});
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`);
  }
}
