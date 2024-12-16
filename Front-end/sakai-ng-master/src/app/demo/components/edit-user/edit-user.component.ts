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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: [''],
            phoneNumber: [''],
        });

        this.passwordForm = this.fb.group({
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

        this.http.get<any>('http://localhost:8081/user/details').subscribe(
            (user) => {
                // Patch the user data into the form
                this.userForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                });
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
              // Success message
              this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'User information updated successfully!',
              });
          },
          (error) => {
              console.error('Error updating user details:', error);
              // Error message
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
  
      const { newPassword, confirmPassword } = this.passwordForm.value;
  
      if (newPassword !== confirmPassword) {
          // Error message for mismatched passwords
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'New password and confirm password do not match.',
          });
          return;
      }
  
      // Call backend to update password
      this.http.put('http://localhost:8081/user/updatePassword', { password: newPassword }).subscribe(
          (response) => {
              // Success message
              this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Password has been successfully updated!',
              });
          },
          (error) => {
              console.error('Error updating password:', error);
              // Error message
              this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update password.',
              });
          }
      );
  }
  

    cancelUpdate(): void {
      // Reset the user form to its initial values
      this.userForm.reset();
      this.loadUserData(); // Reload current user data
      this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Changes canceled.',
      });
  }
  
  cancelPasswordUpdate(): void {
      // Reset the password form
      this.passwordForm.reset();
      this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Password update canceled.',
      });
  }
  
}
