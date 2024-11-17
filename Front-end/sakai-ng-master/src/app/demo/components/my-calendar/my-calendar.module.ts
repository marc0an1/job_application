import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCalendarComponent } from './my-calendar.component';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [MyCalendarComponent],
  imports: [
    CommonModule,
    MyCalendarRoutingModule,
    FullCalendarModule // Import FullCalendarModule here if needed
  ]
})
export class MyCalendarModule { }