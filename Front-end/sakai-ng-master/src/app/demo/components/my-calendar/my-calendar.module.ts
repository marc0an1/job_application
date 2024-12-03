import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCalendarComponent } from './my-calendar.component';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [MyCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    MyCalendarRoutingModule,
    FullCalendarModule // Import FullCalendarModule here if needed
  ]
})
export class MyCalendarModule { }