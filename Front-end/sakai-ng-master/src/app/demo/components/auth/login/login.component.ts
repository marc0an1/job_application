import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service'; // Adjust this import path as needed
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    username: string = ''; // Add a username property
    password: string = '';

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }

    // Method to handle login
    login(): void {
        const loginData = { username: this.username, password: this.password };
        
        this.authService.login(loginData).subscribe(
            response => {
                const token = response;
                if(token){
                    sessionStorage.setItem('authToken',token);
                    console.log('Login Successful:', response);

                    // Dispatch a custom event with the token
                    const tokenEvent = new CustomEvent('authTokenAvailable', {
                        detail: { token },
                    });
                    window.dispatchEvent(tokenEvent); // Dispatch the event
                    console.log("Token event dispatched:", token);

                    // Redirect the user to the dashboard                       
                    this.router.navigate(['/dashboard']);
                }else{
                    console.error('no token received');
                    alert('Login failed. No token received');
                }
            },
            error => {
                console.error('Login failed:', error);
                alert('Invalid credentials. Please try again.'); // Notify the user of the error
            }
        );
    }
}
