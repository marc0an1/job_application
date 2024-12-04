import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from './event.service'; // Import the EventService

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
})
export class MyCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;
  displayDialog: boolean = false; // Controls the visibility of the dialog
  eventFormData: any = { title: '', category: '', date: '' }; // Holds form data
  selectedEvent: any = { title: '', category: '', date: '' }; // Stores the event being edited
  eventCategories: any[] = [
    { name: 'Interview', value: 'interview' },
    { name: 'Info Session', value: 'infoSession' },
    { name: 'Offer Due Date', value: 'offerDueDate' },
  ]; // Dropdown options
  events: any[] = []; // Store events

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      events: [], // Placeholder for events
    };
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe(
      (events) => {
        this.events = events.map((event) => ({
          id: event.eventID,
          title: event.eventTitle,
          start: event.eventDate,
          extendedProps: { category: event.eventCategory },
        }));
        this.calendarOptions.events = [...this.events];
      },
      (error) => {
        console.error('Failed to fetch events:', error);
      }
    );
  }

  handleDateClick(arg: any) {
    this.eventFormData.date = arg.dateStr;
    this.displayDialog = true;
  }

  saveEvent() {
    const newEvent = {
      eventTitle: this.eventFormData.title,
      eventCategory: this.eventFormData.category,
      eventDate: this.eventFormData.date,
    };

    this.eventService.createEvent(newEvent).subscribe(
      (savedEvent) => {
        this.events.push({
          id: savedEvent.eventID,
          title: savedEvent.eventTitle,
          start: savedEvent.eventDate,
          extendedProps: { category: savedEvent.eventCategory },
        });
        this.calendarOptions.events = [...this.events];
        this.closeDialog();
      },
      (error) => {
        console.error('Failed to save event:', error);
      }
    );
  }

  closeDialog() {
    this.displayDialog = false;
    this.eventFormData = { title: '', category: '', date: '' };
  }
}
