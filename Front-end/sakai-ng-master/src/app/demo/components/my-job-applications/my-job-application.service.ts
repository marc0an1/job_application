import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JobApplicationService {
    private apiUrl = 'http://localhost:8081/jobApplication'; // Base URL for job applications

    constructor(private http: HttpClient) {}

    // Fetch all job applications for the current user
    getJobApplications(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getJobApplications`);
    }

    // Create a new job application
    createJobApplication(jobApplication: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/createJobApplication`, jobApplication);
    }

    // Update an existing job application
    updateJobApplication(jobApplication: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/updateJobApplication`, jobApplication);
    }

    // Delete a job application
    deleteJobApplication(applicationID: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteJobApplication`, {
            body: { applicationID }, // Send the applicationID in the body of the request
        });
    }
}
