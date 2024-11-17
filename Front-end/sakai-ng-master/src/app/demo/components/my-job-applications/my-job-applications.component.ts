import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-my-job-applications',
  standalone: true,
  templateUrl: './my-job-applications.component.html',
  styleUrls: ['./my-job-applications.component.scss'],
  imports: [
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

  submitForm() {
    this.applications.push({ ...this.jobApplication }); // Add the new application to applications array
    this.filteredApplications = [...this.applications]; // Update filtered Applications to reflect new additions
    this.displayDialog = false; // Close the dialog pane

    // Reset form fields
    this.jobApplication = {
        companyName: '',
        jobTitle: '',
        dateApplied: null,
        status: null,
        notes: ''
    };
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
