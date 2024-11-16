import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/user'; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, credentials, {responseType: 'text'}).pipe(
      tap((response: string) => {
        const token = response; // token sent as plain text
        if (token) {
          sessionStorage.setItem('authToken', token); // Store the token in sessionStorage
        }
      })
    );
  }

  // Method to log out the user
  logout(): void {
    sessionStorage.removeItem('authToken'); // Clear the auth token from sessionStorage
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken'); // Check for token in sessionStorage
  }

  // Method to sign up the user
  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUser`, signupData);
  }

  // Method to retrieve the token from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // Example method to make an authenticated request using the JWT
  getProtectedData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get('YOUR_PROTECTED_API_ENDPOINT', { headers });
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
