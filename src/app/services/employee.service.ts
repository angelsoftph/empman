import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { Observable } from 'rxjs';
import { Employee, EmployeeView } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${env.apiUrl}/employee`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeView[]> {
    return this.http.get<EmployeeView[]>(this.apiUrl);
  }

  getEmployeesByCategoryId(categoryId: number): Observable<EmployeeView[]> {
    return this.http.get<EmployeeView[]>(
      `${this.apiUrl}/category/${categoryId}`
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }
}
