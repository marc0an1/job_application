import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service'; // Adjust this import path as needed
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { HttpErrorResponse, HttpParamsOptions } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class SignupComponent {
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    phoneNumber: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';
    country: string = '';

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }

    // Method to handle signup
    signup(): void {
        if (this.password !== this.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const signupData = {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            address: {
                street: this.street,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode,
                country: this.country
            },
            phoneNumber: Number(this.phoneNumber)
        };

        this.authService.signup(signupData).subscribe(
            response => {
                if (response) {
                console.log('Signup successful:', response);
                this.router.navigate(['/auth/login']); // Navigate to confirmation page after successful signup
            }else{
                console.log('Signup Failed: Invalid response', response);
                alert("Signup Failed. Please try again.");
            }
        },
        (error: HttpErrorResponse) => {
            console.error('Signup failed:', error);
            if (error.status === 400) {
                console.log('Headers:', error.headers.keys());
                const errorMessage = error.headers.get('Error');
                alert("Email or Username are already taken. Please use a different email or username and try again."); // Display the error message from the header
              } else {
                alert('Signup failed. Please try again.');
              }
        }
        );
    }
}
