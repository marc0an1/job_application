import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from './my-job-application.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute


@Component({
    selector: 'app-my-job-applications',
    templateUrl: './my-job-applications.component.html',
    styleUrls: ['./my-job-applications.component.scss'],
    providers: [MessageService],
})
export class MyJobApplicationsComponent implements OnInit {
    displayDialog: boolean = false;
    editing: boolean = false; // Tracks whether we are editing an existing application
    sortField: string = 'companyName'; // Default sort field
    sortOrder: number = 1; // 1 for ascending, -1 for descending
    selectedStatus: string | null = null; // Stores the selected status
    selectedDate: Date | null = null; // Stores the selected date
    searchQuery: string = ''; // Stores the search query
    isConfirmToastVisible: boolean = false; // Tracks if the confirm toast is visible

    jobApplication = {
        applicationID: null, // Include applicationID for editing
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

    applications: any[] = [];
    filteredApplications: any[] = [];
    sortOptions: any[] = [
        { label: 'Company Name', value: 'companyName' },
        { label: 'Date Applied', value: 'dateApplied' },
        { label: 'Status', value: 'status' }
    ];

    constructor(
        private jobApplicationService: JobApplicationService,
        private messageService: MessageService,
        private route: ActivatedRoute // Inject ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.loadJobApplications(); // Fetch applications on load

        // Listen for query parameters to trigger actions
        this.route.queryParams.subscribe((params) => {
            if (params['openForm']) {
                this.showDialog(false); // Open the form for adding a new application
            }
        });
    }

    loadJobApplications(): void {
        this.jobApplicationService.getJobApplications().subscribe(
            (response) => {
                console.log('Job applications fetched successfully:', response);
                this.applications = response;
                this.filteredApplications = [...this.applications];
                console.log('Filtered Applications:', this.filteredApplications);
            },
            (error) => {
                console.error('Error fetching job applications:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load job applications. Please try again later.',
                });
            }
        );
    }

    showDialog(editing: boolean = false, application: any = null): void {
        this.editing = editing;

        if (editing && application) {
            // Populate form with selected application for editing
            this.jobApplication = { ...application,
                jobTitle: application.jobDescription, // Map backend field name to frontend form
                dateApplied: application.dateApplied ? new Date(application.dateApplied) : null, // Ensure date format
             };
        } else {
            // Reset the form for new job application
            this.jobApplication = {
                applicationID: null,
                companyName: '',
                jobTitle: '',
                dateApplied: null,
                status: null,
                notes: ''
            };
        }

        this.displayDialog = true;
    }

    submitForm(): void {
        const jobApplication = {
            companyName: this.jobApplication.companyName,
            jobDescription: this.jobApplication.jobTitle,
            dateApplied: this.jobApplication.dateApplied
                ? this.jobApplication.dateApplied.toISOString().split('T')[0]
                : null,
            status: this.jobApplication.status,
            notes: this.jobApplication.notes
        };

        console.log('Submitting job application:', jobApplication);

        this.jobApplicationService.createJobApplication(jobApplication).subscribe(
            (response) => {
                console.log('Job application submitted successfully:', response);

                // Reload job applications
                this.loadJobApplications();

                // Close the dialog
                this.displayDialog = false;

                // Show success toast
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Job application submitted successfully!',
                });
            },
            (error) => {
                console.error('Error submitting job application:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to submit job application. Please try again.',
                });
            }
        );
    }

    updateForm(): void {
        const updatedApplication = {
            applicationID: this.jobApplication.applicationID,
            companyName: this.jobApplication.companyName,
            jobDescription: this.jobApplication.jobTitle,
            dateApplied: this.jobApplication.dateApplied
                ? this.jobApplication.dateApplied.toISOString().split('T')[0]
                : null,
            status: this.jobApplication.status,
            notes: this.jobApplication.notes
        };

        console.log('Updating job application:', updatedApplication);

        this.jobApplicationService.updateJobApplication(updatedApplication).subscribe(
            (response) => {
                console.log('Job application updated successfully:', response);

                // Reload job applications
                this.loadJobApplications();

                // Close the dialog
                this.displayDialog = false;

                // Show success toast
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Job application updated successfully!',
                });
            },
            (error) => {
                console.error('Error updating job application:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update job application. Please try again.',
                });
            }
        );
    }

    deleteApplication(): void {
        if (!this.jobApplication.applicationID) {
            return;
        }
    
        this.messageService.clear(); // Clear previous messages
        this.messageService.add({
            key: 'confirmDelete',
            severity: 'warn',
            summary: 'Confirm Delete',
            detail: 'Are you sure you want to delete this job application?',
            sticky: true,
        });
    }

    onConfirm(): void {
        if (!this.jobApplication.applicationID) {
            return;
        }
    
        this.jobApplicationService.deleteJobApplication(this.jobApplication.applicationID).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'Job application deleted successfully!',
                });
    
                // Reload job applications
                this.loadJobApplications();
    
                // Close the dialog
                this.displayDialog = false;
            },
            (error) => {
                console.error('Error deleting job application:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete job application. Please try again later.',
                });
            }
        );
    
        this.messageService.clear('confirmDelete'); // Clear the confirmation message
    }
    
    onReject(): void {
        this.messageService.clear('confirmDelete'); // Dismiss the confirmation message
    }
    
    
    

    filterApplications(): void {
        this.filteredApplications = this.applications.filter(application => {
            const matchesSearch = this.searchQuery
                ? application.companyName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                  application.jobDescription.toLowerCase().includes(this.searchQuery.toLowerCase())
                : true;

            const matchesStatus = this.selectedStatus
                ? application.status === this.selectedStatus
                : true;

            const matchesDate = this.selectedDate
                ? application.dateApplied === this.selectedDate.toISOString().split('T')[0]
                : true;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }

    onFilter(event: any): void {
        this.searchQuery = event.target.value;
        this.filterApplications();
    }

    onStatusFilterChange(event: any): void {
        this.selectedStatus = event.value;
        this.filterApplications();
    }

    onDateFilterChange(event: any): void {
        this.selectedDate = event ? new Date(event) : null; // Convert Date to ISO string format
        this.filterApplications();
    }    

    onSortChange(event: any): void {
        this.sortField = event.value;
    }

    resetFilters(): void {
        this.searchQuery = '';
        this.selectedStatus = null;
        this.selectedDate = null;
        this.filteredApplications = [...this.applications]; // Reset filtered applications
    }    
}
