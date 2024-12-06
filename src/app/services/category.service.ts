import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${env.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
