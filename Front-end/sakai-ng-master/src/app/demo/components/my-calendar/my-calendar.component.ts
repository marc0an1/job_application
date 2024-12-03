import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
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

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth', // Default view
      editable: true, // Allows dragging and dropping
      selectable: true, // Enables date selection
      selectMirror: true,
      dateClick: this.handleDateClick.bind(this), // Bind to component context
      events: [], // Placeholder for events
    };
    
  }
  // Handle Date Click
  handleDateClick(arg: any) {
    this.eventFormData.date = arg.dateStr; // Pre-fill the date in the dialog
    this.displayDialog = true; // Show the dialog
  }

  // Save Event
  saveEvent() {
    const newEvent = {
      title: this.eventFormData.title,
      start: this.eventFormData.date,
      extendedProps: {
        category: this.eventFormData.category, // Store the category
      },
    };
    this.events.push(newEvent); // Add the new event to the calendar
    this.calendarOptions.events = [...this.events]; // Update calendar events
    this.closeDialog(); // Close the dialog
  }

  // Close Dialog
  closeDialog() {
    this.displayDialog = false;
    this.eventFormData = { title: '', category: '', date: '' }; // Reset form
  }

  
}