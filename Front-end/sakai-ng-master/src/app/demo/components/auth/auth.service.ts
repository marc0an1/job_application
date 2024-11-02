import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/user'; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, credentials);
  }

  // Method to log out the user
  logout(): void {
    // Logic for logging out (e.g., removing tokens from local storage)
    localStorage.removeItem('authToken'); // Example: remove the auth token
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    // Logic to check if the user is logged in (e.g., checking for a token)
    return !!localStorage.getItem('authToken'); // Example
  }

  // Method to sign up the user
  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUser`, signupData);
  }
}
