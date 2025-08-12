import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { User, LoginRequest, SignupRequest, AuthResponse } from '../dtos/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('current_user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return from(axios.post<AuthResponse>(`${this.apiUrl}/login`, credentials))
      .pipe(
        map((response: AxiosResponse<AuthResponse>) => response.data),
        tap((data: AuthResponse) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('current_user', JSON.stringify(data.user));
          this.currentUserSubject.next(data.user);
        })
      );
  }

  signup(userData: SignupRequest): Observable<any> {
    return from(axios.post(`${this.apiUrl}/onboard`, userData));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.active;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getMe(): Observable<User> {
    return from(axios.get<User>(`${this.apiUrl}/me`))
      .pipe(
        map((response: AxiosResponse<User>) => response.data)
      );
  }

  getPermissionMatrix(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/permission-matrix`));
  }

  getAllUsers(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/users`))
      .pipe(
        map((response: AxiosResponse<any>) => response.data)
      );
  }

  updateUser(userId: string, userData: Partial<User>): Observable<any> {
    return from(axios.put(`${this.apiUrl}/users/${userId}`, userData))
      .pipe(
        map((response: AxiosResponse<any>) => response.data)
      );
  }
}
