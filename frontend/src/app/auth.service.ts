import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  // Регистрация пользователя
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

  // Авторизация (получение токена)
  login(password: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/login/`, {
      password,
      username,
    });
  }

  // Логаут (удаление токена)
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/logout/`, {});
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`);
  }
}
