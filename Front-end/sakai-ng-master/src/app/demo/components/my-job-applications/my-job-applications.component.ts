import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
    selector: 'app-my-job-applications',
    standalone: true,
    templateUrl: './my-job-applications.component.html',
    styleUrls: ['./my-job-applications.component.scss'],
    imports: [
      CommonModule,
      DialogModule,
      DropdownModule,
      CalendarModule,
      FormsModule,
      DataViewModule
    ],
})
export class MyJobApplicationsComponent implements OnInit {
    displayDialog: boolean = false;
    sortField: string = 'companyName'; // Default sort field
    sortOrder: number = 1; // 1 for ascending, -1 for descending

    jobApplication = {
      companyName: '',
      jobTitle: '',
      dateApplied: null,
      status: null,
      notes: ''
    };

    statusOptions = [   
      { name: 'Applied', code: 'Applied' },
      { name: 'Interview Scheduled', code: 'Interview Scheduled' },
      { name: 'Interview Completed', code: 'Interview Completed' },
      { name: 'Offer Extended', code: 'Offer Extended' },
      { name: 'Offer Accepted', code: 'Offer Accepted' },
      { name: 'Offer Declined', code: 'Offer Declined' },
      { name: 'Rejected', code: 'Rejected' }
    ];

    applications: any[] = [
      { companyName: 'Company A', position: 'Developer', dateApplied: new Date('2023-10-01'), status: 'Pending', notes: 'Follow up next week' },
      { companyName: 'Company B', position: 'Designer', dateApplied: new Date('2023-10-02'), status: 'Interview', notes: 'Prepare portfolio' }
    ];
    filteredApplications: any[] = [];
    sortOptions: any[] = [
      { label: 'Company Name', value: 'companyName' },
      { label: 'Date Applied', value: 'dateApplied' },
      { label: 'Status', value: 'status' }
    ];
    selectedSortOption: string;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.filteredApplications = [...this.applications];
    }

    showDialog() {
      this.displayDialog = true;
    }

    // submitForm() {
    //   this.applications.push({ ...this.jobApplication }); // Add the new application to applications array
    //   this.filteredApplications = [...this.applications]; // Update filtered Applications to reflect new additions
    //   this.displayDialog = false; // Close the dialog pane

    //   // Reset form fields
    //   this.jobApplication = {
    //       companyName: '',
    //       jobTitle: '',
    //       dateApplied: null,
    //       status: null,
    //       notes: ''
    //   };
    // }

    submitForm() {
      const apiUrl = 'http://localhost:8081/jobApplication/createJobApplication';
  
      const jobApplication = {
          companyName: this.jobApplication.companyName,
          jobDescription: this.jobApplication.jobTitle,  // Ensure field name matches backend
          dateApplied: this.jobApplication.dateApplied ? this.jobApplication.dateApplied.toISOString().split('T')[0] : null,
          status: this.jobApplication.status,
          notes: this.jobApplication.notes
      };

      console.log('Submitting job application:', jobApplication);
  
      this.http.post(apiUrl, jobApplication).subscribe(
          response => {
              console.log('Job application submitted successfully:', response);
              this.applications.push({ ...this.jobApplication });
              this.filteredApplications = [...this.applications];
              this.displayDialog = false;
  
              // Reset form fields
              this.jobApplication = {
                  companyName: '',
                  jobTitle: '',
                  dateApplied: null,
                  status: null,
                  notes: ''
              };
  
              // Show success message to the user
              alert('Job application submitted successfully!');
          },
          (error: HttpErrorResponse) => {
              console.error('Error submitting job application:', error);
  
              // Display user-friendly messages based on status code or error type
              if (error.status === 0) {
                  // Network error or CORS issue
                  alert('Network error: Please check your internet connection or CORS settings.');
              } else if (error.status === 400) {
                  // Bad request
                  alert('Invalid data: Please check your form entries and try again.');
              } else if (error.status === 401) {
                  // Unauthorized (e.g., token expired or missing)
                  alert('Unauthorized: Please log in again to continue.');
              } else if (error.status === 403) {
                  // Forbidden (e.g., insufficient permissions)
                  alert('You do not have permission to perform this action.');
              } else if (error.status === 404) {
                  // Not Found (e.g., API endpoint doesn’t exist)
                  alert('Server error: The requested resource could not be found.');
              } else if (error.status === 500) {
                  // Internal Server Error
                  alert('Server error: Please try again later.');
              } else {
                  // Generic error message
                  alert('An unexpected error occurred. Please try again.');
              }
          }
      );
  }



    onFilter(event: any): void {
      const query = event.target.value.toLowerCase();
      this.filteredApplications = this.applications.filter(application =>
        application.companyName.toLowerCase().includes(query)
      );
    }

    onSortChange(event: any): void {
      this.sortField = event.value;
    }
}
