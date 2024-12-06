import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { EmployeeView, Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${env.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getEmployeeAccountsByUserId(userId: number): Observable<Employee[]> {
    return this.http.get<EmployeeView[]>(`${this.apiUrl}/accounts/${userId}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
}
