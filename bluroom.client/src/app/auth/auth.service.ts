import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`; 

  constructor(private http: HttpClient) { }

  register(fullName: string, email: string, password: string): Observable<any> {
    const registroDto = { FullName: fullName, Email: email, Password: password };
    return this.http.post(`${this.baseUrl}/register`, registroDto);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      Email: email,
      Password: password
    });

  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
