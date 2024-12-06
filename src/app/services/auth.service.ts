import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { env } from '../../environments/env';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${env.apiUrl}/auth`;
  private jwtHelper = new JwtHelperService();

  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );
  public token$ = this.tokenSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    user.role = 'W';
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        tap((token: string) => {
          if (token) {
            localStorage.setItem('AUTHTOKEN', token);
            this.tokenSubject.next(token);
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('AUTHTOKEN');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('AUTHTOKEN');
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
