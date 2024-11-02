import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module'; // Make sure this file is created
import { SignupComponent } from './signup.component'; // Make sure the SignupComponent is created
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast'; // Optional: if you want to use Toast for notifications

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        ToastModule // Optional: add this if using PrimeNG Toast for feedback
    ],
    declarations: [SignupComponent]
})
export class SignupModule { }
