// event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8081/event'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEvents`);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createEvent`, event);
  }

  updateEvent(event: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateEvent`, event);
  }

  deleteEvent(eventID: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteEvent`, { body: { eventID } });
  }
}
