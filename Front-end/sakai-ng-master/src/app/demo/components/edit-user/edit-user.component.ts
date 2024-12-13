import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
    providers: [MessageService],
})
export class EditUserComponent implements OnInit {
    userForm: FormGroup;
    passwordForm: FormGroup;
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private messageService: MessageService
    ) {
        // Initialize forms
        this.userForm = this.fb.group({
            userID: [''], // Should be populated from backend
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: [''],
            phoneNumber: [''],
        });

        this.passwordForm = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.loadUserData();
    }

    // Load the user data into the form
    loadUserData(): void {
        this.isLoading = true;

        // Replace with the actual backend endpoint to fetch user details
        this.http.get<any>('http://localhost:8081/user/details').subscribe(
            (user) => {
                this.userForm.patchValue(user);
                this.isLoading = false;
            },
            (error) => {
                console.error('Error fetching user data:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load user data.',
                });
                this.isLoading = false;
            }
        );
    }

    // Update user details
    updateUser(): void {
        if (this.userForm.invalid) {
            return;
        }

        const userData = this.userForm.value;

        this.http.put('http://localhost:8081/user/updateUser/', userData).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User details updated successfully!',
                });
            },
            (error) => {
                console.error('Error updating user details:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update user details.',
                });
            }
        );
    }

    // Update password
    updatePassword(): void {
        if (this.passwordForm.invalid) {
            return;
        }

        const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

        if (newPassword !== confirmPassword) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'New password and confirm password do not match.',
            });
            return;
        }

        this.http.put('http://localhost:8081/user/updatePassword', { password: newPassword }).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Password updated successfully!',
                });
            },
            (error) => {
                console.error('Error updating password:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update password.',
                });
            }
        );
    }
}
