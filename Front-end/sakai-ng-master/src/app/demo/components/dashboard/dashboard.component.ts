import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../my-job-applications/my-job-application.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    filterOptions: any[] = [{ label: 'All', value: null }];
    selectedFilter: any;
    expandedSection: string | null = null;

    statistics: any = null;
    isLoading: boolean = true; // To show a loading indicator while fetching data
    pieChartData: any = null;
    doughnutChartData: any = null;
    currentChartType: string = 'pie'; // Default to pie chart

    applications: any[] = [];
    recentActivities: any = { latestApplications: [], recentStatusUpdates: [], notifications: [] };
    isLoadingActivities: boolean = true;
    legendData: any[] = []; // Added legendData property


    constructor(private jobApplicationService: JobApplicationService) {}

    ngOnInit(): void {
        this.loadJobApplicationsAndCalculateStatistics();
        this.chartOptions = {
            plugins: {
                legend: {
                    display: false, // Disable default chart legend
                },
            },
        }
    }

    loadJobApplicationsAndCalculateStatistics(): void {
        this.jobApplicationService.getJobApplications().subscribe(
            (applications) => {
                this.applications = applications;
                this.calculateStatistics(applications);
                this.processRecentActivities();
                this.isLoadingActivities = false;
                this.prepareChartData();
                this.isLoading = false;
            },
            (error) => {
                console.error('Error fetching job applications:', error);
                this.isLoading = false;
            }
        );
    }

    prepareChartData(): void {
        if (!this.statistics || !this.statistics.statuses) return;
    
        const documentStyle = getComputedStyle(document.documentElement);
        const statusKeys = Object.keys(this.statistics.statuses);
        const statusValues = Object.values(this.statistics.statuses);
    
        const colors = [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--teal-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--pink-500'),
        ];
    
        this.pieChartData = {
            labels: statusKeys,
            datasets: [
                {
                    data: statusValues,
                    backgroundColor: colors.slice(0, statusKeys.length),
                    hoverBackgroundColor: colors.map((color) =>
                        color.replace('-500', '-400')
                    ),
                },
            ],
        };
    
        // Generate the legend data
        this.legendData = statusKeys.map((status, index) => ({
            label: status,
            color: colors[index % colors.length], // Cycle through colors if more statuses exist
        }));
    }

    toggleChartType(): void {
        this.currentChartType = this.currentChartType === 'pie' ? 'doughnut' : 'pie';
        console.log('Current Chart Type:', this.currentChartType); // Debugging
    }

    calculateStatistics(applications: any[]): void {
        const totalApplications = applications.length;
        const statuses = applications.reduce((acc: any, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});

        this.statistics = {
            totalApplications,
            statuses,
        };
    }

    getStatusKeys(): string[] {
        return this.statistics ? Object.keys(this.statistics.statuses) : [];
    }
    
    getChartStyle(): string {
        return this.expandedSection === 'overview'
            ? 'width: 300px; height: 300px;' // Larger size when maximized
            : 'width: 150px; height: 150px;'; // Smaller size when minimized
    }

    chartOptions: any = {
        plugins: {
            legend: {
                display: false, // Disable default chart legend
            },
        },
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart resizes properly
    };
    

    defaultStyle = `
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 250px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
`;

    expandedStyle = `
        border: 1px solid #ccc;
        padding: 40px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        height: calc(100vh - 30px);
        width: calc(100vw - 30px);
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: #fff;
        z-index: 1000;
        cursor: auto;
        transition: all 0.3s ease;
        overflow: hidden;
    `;


    // ---------- Methods for Recent Activities Section ----------

    processRecentActivities(): void {
        // Sort applications by creation date (if available)
        const sortedApplications = [...this.applications].sort((a, b) => {
            const dateA = new Date(a.dateApplied).getTime();
            const dateB = new Date(b.dateApplied).getTime();
            return dateB - dateA; // Latest first
        });

        // Latest Applications (Top 5 recent ones)
        this.recentActivities.latestApplications = sortedApplications.slice(0, 5);

        // Recent Status Updates (Applications with status changes)
        this.recentActivities.recentStatusUpdates = this.applications
            .filter((app) => app.statusUpdatedDate) // Ensure there's a status update date
            .sort((a, b) => {
                const dateA = new Date(a.statusUpdatedDate).getTime();
                const dateB = new Date(b.statusUpdatedDate).getTime();
                return dateB - dateA; // Latest first
            })
            .slice(0, 5); // Limit to top 5 updates

        // Notifications (e.g., upcoming deadlines or interviews)
        const now = new Date();
        this.recentActivities.notifications = this.applications
            .filter((app) => app.interviewDate && new Date(app.interviewDate) > now) // Filter future events
            .map((app) => ({
                message: `Interview with ${app.companyName} on ${new Date(app.interviewDate).toLocaleDateString()}`,
                timestamp: app.interviewDate,
            }))
            .sort((a, b) => {
                const dateA = new Date(a.timestamp).getTime();
                const dateB = new Date(b.timestamp).getTime();
                return dateA - dateB; // Upcoming first
            })
            .slice(0, 5); // Limit to top 5 notifications
    }

    formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();

        if (diffMs < 60 * 1000) return 'Just now';
        if (diffMs < 60 * 60 * 1000) return `${Math.floor(diffMs / (60 * 1000))} minutes ago`;
        if (diffMs < 24 * 60 * 60 * 1000) return `${Math.floor(diffMs / (60 * 60 * 1000))} hours ago`;
        if (diffMs < 7 * 24 * 60 * 60 * 1000) return `${Math.floor(diffMs / (24 * 60 * 60 * 1000))} days ago`;

        return date.toLocaleDateString();
    }

    toggleExpand(section: string, event: Event): void {
        event.stopPropagation();
        if (this.expandedSection === section) {
            this.expandedSection = null;
        } else {
            this.expandedSection = section;
    
            // Reload the chart animation if 'overview' is being toggled
            if (section === 'overview') {
                this.pieChartData = { ...this.pieChartData }; // Create a new reference
            }
        }
    }
    

    minimizeSection(section: string, event: Event) {
        event.stopPropagation(); // Prevent the click from triggering toggleExpand
        //this.expandedSection = null;
        this.expandedSection = this.expandedSection === section ? null : section;
    }
}
