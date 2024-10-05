import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private apiUrl = 'http://147.45.103.62:8000/api';

  constructor(private http: HttpClient) {}

  get_list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cats`);
  }

  create_cat(
    name: string,
    age: number,
    breed: string,
    is_furry: boolean,
    breeder: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/cats/`, {
      name,
      age,
      breed,
      is_furry,
      breeder,
    });
  }

  del_cat(id: number) {
    return this.http.delete(`${this.apiUrl}/cats/${id}/`);
  }

  update_cat_data(id: number, cat: any) {
    return this.http.put(`${this.apiUrl}/cats/${id}/`, cat);
  }
  get_cat_data(id: number) {
    return this.http.get(`${this.apiUrl}/cats/${id}/`);
  }
}
