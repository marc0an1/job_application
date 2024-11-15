import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-my-calendar',
  // standalone: true,
  // imports: [],
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})
export class MyCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: [
        // Example events for now
        { title: 'event 1', date: '2021-06-01' },
        { title: 'event 2', date: '2021-06-02' }
      ]
      
    }
  }

  handleDateClick(arg) {
    const title = prompt('Enter event title:');
    if(title) {
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as any[]),
        { title, date: arg.dateStr}
      ];
    }
  }

}
