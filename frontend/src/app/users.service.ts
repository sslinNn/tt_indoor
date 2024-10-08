import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://147.45.103.62:8000/auth';
  constructor(private http: HttpClient) {}

  get_list(): Observable <any> {
    return this.http.get(`${this.apiUrl}/users/`)
  }
}
