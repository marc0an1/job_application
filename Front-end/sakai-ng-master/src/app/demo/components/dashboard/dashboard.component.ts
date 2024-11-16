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
export class DashboardComponent {

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

    // items!: MenuItem[];

    // products!: Product[];

    // chartData: any;

    // chartOptions: any;

    // subscription!: Subscription;

    // constructor(private productService: ProductService, public layoutService: LayoutService) {
    //     this.subscription = this.layoutService.configUpdate$
    //     .pipe(debounceTime(25))
    //     .subscribe((config) => {
    //         this.initChart();
    //     });
    // }

    // ngOnInit() {
    //     this.initChart();
    //     this.productService.getProductsSmall().then(data => this.products = data);

    //     this.items = [
    //         { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    //         { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    //     ];
    // }

    // initChart() {
    //     const documentStyle = getComputedStyle(document.documentElement);
    //     const textColor = documentStyle.getPropertyValue('--text-color');
    //     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    //     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    //     this.chartData = {
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [
    //             {
    //                 label: 'First Dataset',
    //                 data: [65, 59, 80, 81, 56, 55, 40],
    //                 fill: false,
    //                 backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
    //                 borderColor: documentStyle.getPropertyValue('--bluegray-700'),
    //                 tension: .4
    //             },
    //             {
    //                 label: 'Second Dataset',
    //                 data: [28, 48, 40, 19, 86, 27, 90],
    //                 fill: false,
    //                 backgroundColor: documentStyle.getPropertyValue('--green-600'),
    //                 borderColor: documentStyle.getPropertyValue('--green-600'),
    //                 tension: .4
    //             }
    //         ]
    //     };

    //     this.chartOptions = {
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: textColor
    //                 }
    //             }
    //         },
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     color: textColorSecondary
    //                 },
    //                 grid: {
    //                     color: surfaceBorder,
    //                     drawBorder: false
    //                 }
    //             },
    //             y: {
    //                 ticks: {
    //                     color: textColorSecondary
    //                 },
    //                 grid: {
    //                     color: surfaceBorder,
    //                     drawBorder: false
    //                 }
    //             }
    //         }
    //     };
    // }

    // ngOnDestroy() {
    //     if (this.subscription) {
    //         this.subscription.unsubscribe();
    //     }
    // }
}