import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

    items: MenuItem[]; // Define the items property

    ngOnInit() {
        this.items = [
        { label: 'Update', icon: 'pi pi-refresh', command: () => { this.update(); } },
        { label: 'Delete', icon: 'pi pi-times', command: () => { this.delete(); } },
        { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
        { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
        ];
    }

    update() {
        console.log('Update clicked');
    }

    delete() {
        console.log('Delete clicked');
    }

    jobApplication = {
        companyName: '',
        jobTitle: '',
        dateApplied: '',
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

    constructor(private http: HttpClient) {}

    onSubmit() {
        const apiUrl = 'http://localhost:8080/api/job-applications'; //TODO: replace with actual backend API URL
        this.http.post(apiUrl, this.jobApplication).subscribe(response => {
            console.log('Job application submitted successfully', response);
            // TODO: optionally, reset the form or show a success message
        }, error => {
            console.error('Error submitting job application', error);
        });
    }
}
